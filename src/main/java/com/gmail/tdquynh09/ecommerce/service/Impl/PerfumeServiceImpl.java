package com.gmail.tdquynh09.ecommerce.service.Impl;

import com.gmail.tdquynh09.ecommerce.domain.Perfume;
import com.gmail.tdquynh09.ecommerce.dto.perfume.PerfumeSearchRequest;
import com.gmail.tdquynh09.ecommerce.enums.SearchPerfume;
import com.gmail.tdquynh09.ecommerce.exception.ApiRequestException;
import com.gmail.tdquynh09.ecommerce.repository.PerfumeRepository;
import com.gmail.tdquynh09.ecommerce.repository.projection.PerfumeProjection;
import com.gmail.tdquynh09.ecommerce.service.PerfumeService;
import graphql.schema.DataFetcher;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static com.gmail.tdquynh09.ecommerce.constants.ErrorMessage.FILE_NOT_SAVED;
import static com.gmail.tdquynh09.ecommerce.constants.ErrorMessage.INVALID_IMAGE_FILE;
import static com.gmail.tdquynh09.ecommerce.constants.ErrorMessage.PERFUME_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class PerfumeServiceImpl implements PerfumeService {

    private final PerfumeRepository perfumeRepository;

    @Value("${upload.path}")
    private String uploadPath;

    @Override
    public Perfume getPerfumeById(Long perfumeId) {
        return perfumeRepository.findById(perfumeId)
                .orElseThrow(() -> new ApiRequestException(PERFUME_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    public Page<PerfumeProjection> getAllPerfumes(Pageable pageable) {
        return perfumeRepository.findAllByOrderByIdAsc(pageable);
    }

    @Override
    public List<PerfumeProjection> getPerfumesByIds(List<Long> perfumesId) {
        return perfumeRepository.getPerfumesByIds(perfumesId);
    }

    @Override
    public Page<PerfumeProjection> findPerfumesByFilterParams(PerfumeSearchRequest filter, Pageable pageable) {
        return perfumeRepository.findPerfumesByFilterParams(
                filter.getPerfumers(),
                filter.getGenders(),
                filter.getPrices().get(0),
                filter.getPrices().get(1),
                filter.getSortByPrice(),
                pageable);
    }

    @Override
    public List<Perfume> findByPerfumer(String perfumer) {
        return perfumeRepository.findByPerfumerOrderByPriceDesc(perfumer);
    }

    @Override
    public List<Perfume> findByPerfumeGender(String perfumeGender) {
        return perfumeRepository.findByPerfumeGenderOrderByPriceDesc(perfumeGender);
    }

    @Override
    public Page<PerfumeProjection> findByInputText(SearchPerfume searchType, String text, Pageable pageable) {
        if (searchType.equals(SearchPerfume.BRAND)) {
            return perfumeRepository.findByPerfumer(text, pageable);
        } else if (searchType.equals(SearchPerfume.PERFUME_TITLE)) {
            return perfumeRepository.findByPerfumeTitle(text, pageable);
        } else {
            return perfumeRepository.findByManufacturerCountry(text, pageable);
        }
    }


    @Override
    @Transactional
    public Perfume savePerfume(Perfume perfume, MultipartFile multipartFile) {
        if (multipartFile == null || multipartFile.isEmpty()) {
            Logger.getAnonymousLogger().info("File not uploaded");
            if (perfume.getId() != null && perfume.getFilename() == null) {
                perfumeRepository.findById(perfume.getId())
                        .ifPresent(existing -> perfume.setFilename(existing.getFilename()));
            }
        } else {
            perfume.setFilename(storeFile(multipartFile));
        }
        return perfumeRepository.save(perfume);
    }

    private String storeFile(MultipartFile multipartFile) {
        String originalName = Paths.get(String.valueOf(multipartFile.getOriginalFilename())).getFileName().toString();
        byte[] content;
        try {
            content = multipartFile.getBytes();
        } catch (IOException e) {
            throw new ApiRequestException(FILE_NOT_SAVED + originalName, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // Detect the type from the file content, not from the (client supplied) name or content type
        String extension = detectImageExtension(content);
        if (extension == null) {
            throw new ApiRequestException(INVALID_IMAGE_FILE, HttpStatus.BAD_REQUEST);
        }
        String baseName = originalName.contains(".") ? originalName.substring(0, originalName.lastIndexOf('.')) : originalName;
        String fileName = UUID.randomUUID() + "." + baseName.replaceAll("[^a-zA-Z0-9_-]", "_") + "." + extension;
        try {
            Path directory = Paths.get(uploadPath).toAbsolutePath().normalize();
            Files.createDirectories(directory);
            Files.write(directory.resolve(fileName), content);
        } catch (IOException e) {
            throw new ApiRequestException(FILE_NOT_SAVED + originalName, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // Relative path; the frontend prefixes it with the backend URL
        return "/img/" + fileName;
    }

    static String detectImageExtension(byte[] content) {
        if (startsWith(content, 0, 0xFF, 0xD8, 0xFF)) {
            return "jpg";
        } else if (startsWith(content, 0, 0x89, 'P', 'N', 'G', 0x0D, 0x0A, 0x1A, 0x0A)) {
            return "png";
        } else if (startsWith(content, 0, 'G', 'I', 'F', '8')) {
            return "gif";
        } else if (startsWith(content, 0, 'R', 'I', 'F', 'F') && startsWith(content, 8, 'W', 'E', 'B', 'P')) {
            return "webp";
        }
        return null;
    }

    private static boolean startsWith(byte[] content, int offset, int... signature) {
        if (content == null || content.length < offset + signature.length) {
            return false;
        }
        for (int i = 0; i < signature.length; i++) {
            if ((content[offset + i] & 0xFF) != signature[i]) {
                return false;
            }
        }
        return true;
    }

    @Override
    @Transactional
    public String deletePerfume(Long perfumeId) {
        Perfume perfume = perfumeRepository.findById(perfumeId)
                .orElseThrow(() -> new ApiRequestException(PERFUME_NOT_FOUND, HttpStatus.NOT_FOUND));
        perfumeRepository.delete(perfume);
        return "Perfume deleted successfully";
    }

    @Override
    public DataFetcher<Perfume> getPerfumeByQuery() {
        return dataFetchingEnvironment -> {
            Long perfumeId = Long.parseLong(dataFetchingEnvironment.getArgument("id"));
            return perfumeRepository.findById(perfumeId).get();
        };
    }

    @Override
    public DataFetcher<List<PerfumeProjection>> getAllPerfumesByQuery() {
        return dataFetchingEnvironment -> perfumeRepository.findAllByOrderByIdAsc();
    }

    @Override
    public DataFetcher<List<Perfume>> getAllPerfumesByIdsQuery() {
        return dataFetchingEnvironment -> {
            List<String> objects = dataFetchingEnvironment.getArgument("ids");
            List<Long> perfumesId = objects.stream()
                    .map(Long::parseLong)
                    .collect(Collectors.toList());
            return perfumeRepository.findByIdIn(perfumesId);
        };
    }
}
