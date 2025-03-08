'use client';

import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

interface StarRatingProps {
  fontSize?: string;
  name?: string | number;
  myRating?: number;
  onRatingSelect?: (value: number) => void;
}

export default function StarRating({
  fontSize = '60px',
  name,
  myRating,
  onRatingSelect,
}: StarRatingProps) {
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [clickCheck, setClickCheck] = useState<boolean>(false);

  useEffect(() => {
    if (myRating !== undefined) {
      // myRating이 존재할 경우 상태 설정
      setSelectedRating(myRating.toString());
    }
  }, [myRating]);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (clickCheck) {
      event.preventDefault();
      setClickCheck(false);
      if (onRatingSelect) {
        onRatingSelect(0);
      }
      return;
    }
    const selectedValue = event.target.value;
    setSelectedRating(selectedValue);

    if (onRatingSelect) {
      onRatingSelect(parseInt(selectedValue));
    }
  };
  const handleRatingClick = (event: React.MouseEvent<HTMLLabelElement>) => {
    const selectedValue = (event.target as HTMLLabelElement).title;
    if (selectedRating !== selectedValue) {
      return;
    }
    setClickCheck(true);
    setSelectedRating('0');
  };

  return (
    <RateContainer className="rate" fontSize={fontSize}>
      {Array.from({ length: 10 }, (d, i) => {
        return (
          <React.Fragment key={`${i}${name}`}>
            <input
              type="radio"
              id={`rating${10 - i}-${name}`}
              name={`rating-${name}`}
              value={`${10 - i}`}
              onChange={handleRatingChange}
              checked={selectedRating === `${10 - i}`}
            />
            <label
              className={i % 2 === 1 ? 'half' : ''}
              htmlFor={`rating${10 - i}-${name}`}
              title={`${10 - i}`}
              onClick={handleRatingClick}
            ></label>
          </React.Fragment>
        );
      })}

      <input
        type="radio"
        name={`rating-${name}`}
        value="0"
        onChange={handleRatingChange}
        checked={selectedRating === '0'}
      />
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
