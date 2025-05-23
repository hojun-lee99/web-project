'use client';

import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

interface StarRatingProps {
  fontSize?: string;
  name?: string | number;
  myRating?: number;
  onRatingSelect?: (value: string) => void;
}

export default function StarRating({
  fontSize = '60px',
  name,
  myRating,
  onRatingSelect,
}: StarRatingProps) {
  const [selectedRating, setSelectedRating] = useState<string | null>(null);

  useEffect(() => {
    if (myRating !== undefined) {
      // myRating이 존재할 경우 상태 설정
      setSelectedRating(myRating.toString());
    }
  }, [myRating]);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedRating(selectedValue);

    console.log(`${selectedValue}`);

    if (onRatingSelect) {
      onRatingSelect(selectedValue);
    }
  };

  return (
    <RateContainer className="rate" fontSize={fontSize}>
      <input
        type="radio"
        id={`rating10-${name}`}
        name={`rating-${name}`}
        value="5"
        onChange={handleRatingChange}
        checked={selectedRating === '5'} // 초기 값 설정
      />
      <label htmlFor={`rating10-${name}`} title="5"></label>
      <input
        type="radio"
        id={`rating9-${name}`}
        name={`rating-${name}`}
        value="4.5"
        onChange={handleRatingChange}
        checked={selectedRating === '4.5'}
      />
      <label className="half" htmlFor={`rating9-${name}`} title="4.5"></label>
      <input
        type="radio"
        id={`rating8-${name}`}
        name={`rating-${name}`}
        value="4"
        onChange={handleRatingChange}
        checked={selectedRating === '4'}
      />
      <label htmlFor={`rating8-${name}`} title="4"></label>
      <input
        type="radio"
        id={`rating7-${name}`}
        name={`rating-${name}`}
        value="3.5"
        onChange={handleRatingChange}
        checked={selectedRating === '3.5'}
      />
      <label className="half" htmlFor={`rating7-${name}`} title="3.5"></label>
      <input
        type="radio"
        id={`rating6-${name}`}
        name={`rating-${name}`}
        value="3"
        onChange={handleRatingChange}
        checked={selectedRating === '3'}
      />
      <label htmlFor={`rating6-${name}`} title="3"></label>
      <input
        type="radio"
        id={`rating5-${name}`}
        name={`rating-${name}`}
        value="2.5"
        onChange={handleRatingChange}
        checked={selectedRating === '2.5'}
      />
      <label className="half" htmlFor={`rating5-${name}`} title="2.5"></label>
      <input
        type="radio"
        id={`rating4-${name}`}
        name={`rating-${name}`}
        value="2"
        onChange={handleRatingChange}
        checked={selectedRating === '2'}
      />
      <label htmlFor={`rating4-${name}`} title="2"></label>
      <input
        type="radio"
        id={`rating3-${name}`}
        name={`rating-${name}`}
        value="1.5"
        onChange={handleRatingChange}
        checked={selectedRating === '1.5'}
      />
      <label className="half" htmlFor={`rating3-${name}`} title="1.5"></label>
      <input
        type="radio"
        id={`rating2-${name}`}
        name={`rating-${name}`}
        value="1"
        onChange={handleRatingChange}
        checked={selectedRating === '1'}
      />
      <label htmlFor={`rating2-${name}`} title="1"></label>
      <input
        type="radio"
        id={`rating1-${name}`}
        name={`rating-${name}`}
        value="0.5"
        onChange={handleRatingChange}
        checked={selectedRating === '0.5'}
      />
      <label className="half" htmlFor={`rating1-${name}`} title="0.5"></label>
    </RateContainer>
  );
}

const RateContainer = styled.fieldset<{ fontSize: string }>`
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
      font-size: ${({ fontSize }) => fontSize || '60px'};
      padding: 0.3rem 0.2rem;
      margin: 0;
      font-family: 'FontAwesome';
      content: '\\f005';
    }

    &.half:before {
      content: '\\f089';
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
