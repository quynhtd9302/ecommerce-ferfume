package com.gmail.tdquynh09.ecommerce.dto.perfume;

import com.gmail.tdquynh09.ecommerce.enums.SearchPerfume;
import lombok.Data;

@Data
public class SearchTypeRequest {
    private SearchPerfume searchType;
    private String text;
}
