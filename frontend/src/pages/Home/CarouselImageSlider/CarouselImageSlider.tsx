import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

import { PRODUCT } from "../../../constants/routeConstants";
import "./CarouselImageSlider.css";

export const sliderItems = [
    {
        id: "85",
        name: "Chanel Coco Noir",
        url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1600&q=80",
        eyebrowKey: "home.hero1Eyebrow",
        headingKey: "home.hero1Heading",
        ctaKey: "home.hero1Cta"
    },
    {
        id: "46",
        name: "L'Eau Laurissi",
        url: "https://images.unsplash.com/photo-1566977776052-6e61e35bf9be?auto=format&fit=crop&w=1600&q=80",
        eyebrowKey: "home.hero2Eyebrow",
        headingKey: "home.hero2Heading",
        ctaKey: "home.hero2Cta"
    }
];

const CarouselImageSlider: FC = (): ReactElement => {
    const { t } = useTranslation();

    return (
        <Carousel>
            {sliderItems.map((item) => (
                <div key={item.id} className={"carousel-item-wrapper"}>
                    <Link to={`${PRODUCT}/${item.id}`} className={"carousel-link"} aria-label={item.name} />
                    <div className={"carousel-slide"} style={{ backgroundImage: `url(${item.url})` }}>
                        <div className={"carousel-overlay"}>
                            <span className={"carousel-eyebrow"}>{t(item.eyebrowKey)}</span>
                            <h2 className={"carousel-heading"}>{t(item.headingKey)}</h2>
                            <span className={"carousel-cta"}>{t(item.ctaKey)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default CarouselImageSlider;
