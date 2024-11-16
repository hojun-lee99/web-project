'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // 모듈 import 추가
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';


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
    height:708px;
    width:100%;
    background-color:#d7d7d7;
    padding:122px 0 100px;
    display:flex;
    align-items: flex-end;
    margin:0 auto 0;
`
const SlideTxtWrap = styled.div`
    &::after{
        content:'';
        position:absolute;
        width:100%;
        height:100%;
        background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
        top:0;
        left:0;
        z-index:-1;
    }
    z-index:1;
    max-width:1320px;
    width:100%;
    margin:0 auto;
    .slide-movie-title{
        font-size:28px;
        line-height:1;
        margin-bottom:20px;
        position:relative;
    }
    .slide-movie-info,
    .slide-movie-desc{
        font-size:16px;
        line-height:20px;
        color:#747474;
        margin-bottom:10px;
    }
`
