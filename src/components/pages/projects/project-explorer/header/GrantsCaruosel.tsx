import { Box } from '@chakra-ui/react';
import React from 'react';
import Slider from 'react-slick';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 100,
  duration: 6000,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: true,
};

interface GrantsCarouselProps {
  children: React.ReactNode;
}

export default function GrantsCarousel({ children }: GrantsCarouselProps) {
  return (
    <Box
      position={'relative'}
      width={'full'}
      height="fit-content"
      overflow={'hidden'}
    >
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <Slider {...settings}>
        {React.Children.map(children, (child, index) => (
          <Box
            key={index}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
          >
            {child}
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
