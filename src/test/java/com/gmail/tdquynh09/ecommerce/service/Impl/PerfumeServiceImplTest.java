package com.gmail.tdquynh09.ecommerce.service.Impl;

import com.gmail.tdquynh09.ecommerce.domain.Perfume;
import com.gmail.tdquynh09.ecommerce.exception.ApiRequestException;
import com.gmail.tdquynh09.ecommerce.dto.perfume.PerfumeSearchRequest;
import com.gmail.tdquynh09.ecommerce.repository.PerfumeRepository;
import com.gmail.tdquynh09.ecommerce.repository.projection.PerfumeProjection;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.gmail.tdquynh09.ecommerce.util.TestConstants.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

@SpringBootTest
@TestPropertySource("/application-test.properties")
public class PerfumeServiceImplTest {

    @Autowired
    private PerfumeServiceImpl perfumeService;

    @Autowired
    private SpelAwareProxyProjectionFactory factory;

    @MockitoBean
    private PerfumeRepository perfumeRepository;

    @Test
    public void findPerfumeById() {
        Perfume perfume = new Perfume();
        perfume.setId(123L);

        when(perfumeRepository.findById(123L)).thenReturn(java.util.Optional.of(perfume));
        perfumeService.getPerfumeById(123L);
        assertEquals(123L, perfume.getId());
        assertNotEquals(1L, perfume.getId());
        verify(perfumeRepository, times(1)).findById(123L);
    }

    @Test
    public void findAllPerfumes() {
        Pageable pageable = PageRequest.of(0, 20);
        List<PerfumeProjection> perfumeProjectionList = new ArrayList<>();
        perfumeProjectionList.add(factory.createProjection(PerfumeProjection.class));
        perfumeProjectionList.add(factory.createProjection(PerfumeProjection.class));
        Page<PerfumeProjection> perfumeList = new PageImpl<>(perfumeProjectionList);

        when(perfumeRepository.findAllByOrderByIdAsc(pageable)).thenReturn(perfumeList);
        perfumeService.getAllPerfumes(pageable);
        assertEquals(2, perfumeProjectionList.size());
        verify(perfumeRepository, times(1)).findAllByOrderByIdAsc(pageable);
    }

    @Test
    public void filter() {
        Pageable pageable = PageRequest.of(0, 20);
        
        PerfumeProjection perfumeChanel = factory.createProjection(PerfumeProjection.class);         
        perfumeChanel.setPerfumer(PERFUMER_CHANEL);
        perfumeChanel.setPerfumeGender(PERFUME_GENDER);
        perfumeChanel.setPrice(101);
        PerfumeProjection perfumeCreed = factory.createProjection(PerfumeProjection.class);
        perfumeCreed.setPerfumer(PERFUMER_CREED);
        perfumeCreed.setPerfumeGender(PERFUME_GENDER);
        perfumeCreed.setPrice(102);
        Page<PerfumeProjection> perfumeList = new PageImpl<>(Arrays.asList(perfumeChanel, perfumeCreed));

        List<String> perfumers = new ArrayList<>();
        perfumers.add(PERFUMER_CHANEL);
        perfumers.add(PERFUMER_CREED);

        List<String> genders = new ArrayList<>();
        genders.add(PERFUME_GENDER);

        when(perfumeRepository.findPerfumesByFilterParams(perfumers, genders, 1, 1000, false, pageable)).thenReturn(perfumeList);
        PerfumeSearchRequest filter = new PerfumeSearchRequest();
        filter.setPerfumers(perfumers);
        filter.setGenders(genders);
        filter.setPrices(Arrays.asList(1, 1000));
        filter.setSortByPrice(false);
        perfumeService.findPerfumesByFilterParams(filter, pageable);
        assertEquals(2, perfumeList.getTotalElements());
        assertEquals(perfumeList.getContent().get(0).getPerfumer(), PERFUMER_CHANEL);
        verify(perfumeRepository, times(1)).findPerfumesByFilterParams(perfumers, genders, 1, 1000, false, pageable);
    }

    @Test
    public void findByPerfumerOrderByPriceDesc() {
        Perfume perfumeChanel = new Perfume();
        perfumeChanel.setPerfumer(PERFUMER_CHANEL);
        Perfume perfumeCreed = new Perfume();
        perfumeCreed.setPerfumer(PERFUMER_CREED);
        List<Perfume> perfumeList = new ArrayList<>();
        perfumeList.add(perfumeChanel);
        perfumeList.add(perfumeCreed);

        when(perfumeRepository.findByPerfumerOrderByPriceDesc(PERFUMER_CHANEL)).thenReturn(perfumeList);
        perfumeService.findByPerfumer(PERFUMER_CHANEL);
        assertEquals(perfumeList.get(0).getPerfumer(), PERFUMER_CHANEL);
        assertNotEquals(perfumeList.get(0).getPerfumer(), PERFUMER_CREED);
        verify(perfumeRepository, times(1)).findByPerfumerOrderByPriceDesc(PERFUMER_CHANEL);
    }

    @Test
    public void findByPerfumeGenderOrderByPriceDesc() {
        Perfume perfumeChanel = new Perfume();
        perfumeChanel.setPerfumeGender(PERFUME_GENDER);
        List<Perfume> perfumeList = new ArrayList<>();
        perfumeList.add(perfumeChanel);

        when(perfumeRepository.findByPerfumeGenderOrderByPriceDesc(PERFUME_GENDER)).thenReturn(perfumeList);
        perfumeService.findByPerfumeGender(PERFUME_GENDER);
        assertEquals(perfumeList.get(0).getPerfumeGender(), PERFUME_GENDER);
        assertNotEquals(perfumeList.get(0).getPerfumeGender(), "male");
        verify(perfumeRepository, times(1)).findByPerfumeGenderOrderByPriceDesc(PERFUME_GENDER);
    }

    @Test
    public void savePerfume() throws Exception {
        byte[] jpeg = Files.readAllBytes(Paths.get(FILE_PATH));
        MultipartFile multipartFile = new MockMultipartFile(FILE_NAME, FILE_NAME, "multipart/form-data", jpeg);
        Perfume perfume = new Perfume();
        perfume.setId(1L);
        perfume.setPerfumer(PERFUMER_CHANEL);

        when(perfumeRepository.save(perfume)).thenReturn(perfume);
        Perfume saved = perfumeService.savePerfume(perfume, multipartFile);
        assertTrue(saved.getFilename().startsWith("/img/"));
        assertTrue(saved.getFilename().endsWith("Chanel_N5.jpg"));
        verify(perfumeRepository, times(1)).save(perfume);
    }

    @Test
    public void savePerfume_ShouldRejectNonImageFile() {
        MultipartFile multipartFile = new MockMultipartFile(FILE_NAME, "evil.jpg", "image/jpeg",
                "<html><script>alert(1)</script></html>".getBytes());
        Perfume perfume = new Perfume();

        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> perfumeService.savePerfume(perfume, multipartFile));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
        verify(perfumeRepository, never()).save(perfume);
    }

    @Test
    public void detectImageExtension() {
        assertEquals("jpg", PerfumeServiceImpl.detectImageExtension(new byte[]{(byte) 0xFF, (byte) 0xD8, (byte) 0xFF, 0}));
        assertEquals("png", PerfumeServiceImpl.detectImageExtension(new byte[]{(byte) 0x89, 'P', 'N', 'G', 0x0D, 0x0A, 0x1A, 0x0A}));
        assertEquals("gif", PerfumeServiceImpl.detectImageExtension("GIF89a".getBytes()));
        assertEquals("webp", PerfumeServiceImpl.detectImageExtension("RIFF\0\0\0\0WEBPVP8 ".getBytes()));
        assertNull(PerfumeServiceImpl.detectImageExtension("hello".getBytes()));
        assertNull(PerfumeServiceImpl.detectImageExtension(new byte[0]));
    }
}
