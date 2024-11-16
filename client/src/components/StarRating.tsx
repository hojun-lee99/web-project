'use client';

import styled from 'styled-components';
import { useEffect } from 'react';

const RateContainer = styled.fieldset`
  display: inline-block;
  border: 0;
  margin-right: 15px;
  padding: 0;
  margin: 0;

  > input {
    display: none;
  }

  > label {
    float: right;
    color: var(--color-background-tertiary);
    cursor: pointer;
    position: relative;

    &:before {
      display: inline-block;
      font-size: 60px;
      padding: 0.3rem 0.2rem;
      margin: 0;
      font-family: 'FontAwesome';
      content: '\\f005'; /* Font Awesome star */
    }

    &.half:before {
      content: '\\f089'; /* Font Awesome half-star */
      position: absolute;
      padding-right: 0;
    }
  }

  input:checked ~ label,
  label:hover,
  label:hover ~ label {
    color: var(--color-primary-accent) !important;
  }

  input:checked + label:hover,
  input:checked ~ label:hover,
  input:checked ~ label:hover ~ label,
  label:hover ~ input:checked ~ label {
    color: var(--color-primary-accent) !important;
  }
`;

export default function StarRating() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <RateContainer className="rate">
      <input type="radio" id="rating10" name="rating" value="10" />
      <label htmlFor="rating10" title="5점"></label>
      <input type="radio" id="rating9" name="rating" value="9" />
      <label className="half" htmlFor="rating9" title="4.5점"></label>
      <input type="radio" id="rating8" name="rating" value="8" />
      <label htmlFor="rating8" title="4점"></label>
      <input type="radio" id="rating7" name="rating" value="7" />
      <label className="half" htmlFor="rating7" title="3.5점"></label>
      <input type="radio" id="rating6" name="rating" value="6" />
      <label htmlFor="rating6" title="3점"></label>
      <input type="radio" id="rating5" name="rating" value="5" />
      <label className="half" htmlFor="rating5" title="2.5점"></label>
      <input type="radio" id="rating4" name="rating" value="4" />
      <label htmlFor="rating4" title="2점"></label>
      <input type="radio" id="rating3" name="rating" value="3" />
      <label className="half" htmlFor="rating3" title="1.5점"></label>
      <input type="radio" id="rating2" name="rating" value="2" />
      <label htmlFor="rating2" title="1점"></label>
      <input type="radio" id="rating1" name="rating" value="1" />
      <label className="half" htmlFor="rating1" title="0.5점"></label>
    </RateContainer>
  );
}
