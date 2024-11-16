'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // 모듈 import 추가
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';

<style>

</style>

export default function MainBanner() {
    return (
        <Swiper
            modules={[Navigation, Pagination]} // 모듈 설정 추가
            spaceBetween={0}
            slidesPerView={1}
            navigation
            className='swiper'
        // pagination={{ clickable: true }}
        >
            <SwiperSlide>
                <SlideInnerWrap>
                    <SlideTxtWrap>
                        <div className="slide-movie-title">영화 제목</div>
                        <div className="slide-movie-info">2024</div>
                        <div className="slide-movie-desc">영화정보</div>
                    </SlideTxtWrap>
                </SlideInnerWrap>
            </SwiperSlide>
            <SwiperSlide>
                <SlideInnerWrap>
                    <SlideTxtWrap>
                        <div className="slide-movie-title">영화 제목</div>
                        <div className="slide-movie-info">2024</div>
                        <div className="slide-movie-desc">영화정보</div>
                    </SlideTxtWrap>
                </SlideInnerWrap>
            </SwiperSlide>
            <SwiperSlide>
                <SlideInnerWrap>
                    <SlideTxtWrap>
                        <div className="slide-movie-title">영화 제목</div>
                        <div className="slide-movie-info">2024</div>
                        <div className="slide-movie-desc">영화정보</div>
                    </SlideTxtWrap>
                </SlideInnerWrap>
            </SwiperSlide>
        </Swiper>
    );
}

const SlideInnerWrap = styled.div`
    height:672px;
    width:100%;
    background-color:#fff;
    padding:60px 0 100px;
    display:flex;
    align-items: flex-end;
    max-width:1320px;
    margin:60px auto 0;
`
const SlideTxtWrap = styled.div`
    .slide-movie-title{
        font-size:28px;
        line-height:1;
        margin-bottom:20px;
    }
    .slide-movie-info,
    .slide-movie-desc{
        font-size:16px;
        line-height:20px;
        color:#747474;
        margin-bottom:10px;
    }
`
