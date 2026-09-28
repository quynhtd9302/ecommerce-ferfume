package com.gmail.tdquynh09.ecommerce.mapper;

import com.gmail.tdquynh09.ecommerce.domain.Review;
import com.gmail.tdquynh09.ecommerce.dto.review.ReviewRequest;
import com.gmail.tdquynh09.ecommerce.dto.review.ReviewResponse;
import com.gmail.tdquynh09.ecommerce.exception.InputFieldException;
import com.gmail.tdquynh09.ecommerce.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ReviewMapper {

    private final CommonMapper commonMapper;
    private final ReviewService reviewService;

    public List<ReviewResponse> getReviewsByPerfumeId(Long perfumeId) {
        return commonMapper.convertToResponseList(reviewService.getReviewsByPerfumeId(perfumeId), ReviewResponse.class);
    }

    public ReviewResponse addReviewToPerfume(ReviewRequest reviewRequest, Long perfumeId, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new InputFieldException(bindingResult);
        }
        Review review = commonMapper.convertToEntity(reviewRequest, Review.class);
        return commonMapper.convertToResponse(reviewService.addReviewToPerfume(review, perfumeId), ReviewResponse.class);
    }
}
