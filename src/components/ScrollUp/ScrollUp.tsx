import { useEffect, useState } from "react";
import styled from 'styled-components'

const ScrollDiv = styled.div<{ $toShow: boolean }>`
  position: fixed;
  display: block;
  bottom: 8rem;
  right: 1rem;
  font-family: "Material Icons", fantasy;
  font-size: 3rem;
  color: rgba(234, 234, 234, 0.7);
  background-color: #939999;
  border-radius: 0.4rem;
  cursor: pointer;
  opacity: 0.5;
  transition: transform 0.5s ease-in-out, opacity 0.2s ease-in-out;
  transform: ${props => `translateX(${(props.$toShow ? "0" : "300%")})`};
`;

export const ScrollUp = () => {
  const coords = window.innerHeight;
  const [show, changeShow] = useState(false);


  useEffect(
    () => {
      document.addEventListener('scroll', checkScroll);
      return () => {
        document.removeEventListener('scroll', checkScroll);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [show]
  );

  function checkScroll() {
    const scrolled = window.scrollY;
    if (coords < scrolled && !show) {
      changeShow(true);
    }
    if (coords > scrolled && show) {
      changeShow(false);
    }
  }

  function scrollPage() {
    const scrolled = window.scrollY;
    window.scrollBy(0, -scrolled);
  }

  return (
    <ScrollDiv onClick={scrollPage} $toShow={show}>
      <span className="material-icons-outlined">expand_less</span>
    </ScrollDiv>
  );
}
