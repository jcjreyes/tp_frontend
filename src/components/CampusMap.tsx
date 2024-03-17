import { useState } from 'react';
export default function CampusMap({ setSelectedBuilding }) {
  const unselectedColor = '#383965';
  const [zoomLevel, setZoomLevel] = useState(1);

  const FIRST_THIRD_OF_SCREEN = window.innerWidth * 0.45;
  const VERTICAL_MID_OF_SCREEN = window.innerHeight / 2;

  const [newX, setNewX] = useState(0);
  const [newY, setNewY] = useState(0);

  const [zoomed, setZoomed] = useState(false);
  const [mapItem, setMapItem] = useState(null);

  const handleClick = (event) => {
    if (!zoomed) {
      setZoomed(true);
      setNewX(FIRST_THIRD_OF_SCREEN - event.clientX);
      setNewY(VERTICAL_MID_OF_SCREEN - event.clientY);
      setZoomLevel(3.5);
      event.target.style.fill = '#651940';
      setMapItem(event.target);
    }
  };

  const handleUnzoomed = (event) => {
    setZoomed(false);
    setNewX(0);
    setNewY(0);
    setZoomLevel(1);
    mapItem.style.fill = unselectedColor;
    setMapItem(null);
    setSelectedBuilding(null);
  };

  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='630'
        height='775'
        viewBox='0 0 630 775'
        fill='none'
        style={{
          zIndex: -200,
          transform: `translate(${newX}px, ${newY}px)`,
          scale: `${zoomLevel}`,
          transition: `0.5s ease`,
        }}
      >
        {/* SEC A */}
        <path
          d='M498.541 641.024L433.068 694.5L372.5 626.5L410 606.5L436.5 636.5L425.5 646.5L436.5 662L464.508 634.5L415.008 574.005L433.069 559.5L498.541 641.024Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('SEC A');
            handleClick(event);
          }}
        ></path>
        {/* SEC B */}
        <rect
          x='336'
          y='624.585'
          width='26'
          height='112'
          transform='rotate(-12.4042 336 624.585)'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('SEC B');
            handleClick(event);
          }}
        ></rect>
        {/* SEC C */}
        <rect
          x='297.434'
          y='612'
          width='26'
          height='112'
          transform='rotate(20.6148 297.434 612)'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('SEC C');
            handleClick(event);
          }}
        ></rect>
        {/* Matteo */}
        <rect
          width='32.5519'
          height='100.64'
          transform='matrix(0.0449027 -0.998991 -0.998991 -0.0449027 362.538 774.519)'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('Matteo Ricci Study Hall');
            handleClick(event);
          }}
        ></rect>
        {/* SOM */}
        <rect
          x='250.943'
          y='537'
          width='32.158'
          height='113.477'
          transform='rotate(69.0051 250.943 537)'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('JGSOM Building');
            handleClick(event);
          }}
        ></rect>
        {/* CTC */}
        <path
          d='M274.378 584.79L289.836 620.532L258.336 634.032L253.336 627.532L130.262 674.247L112.336 630.532L161.836 610.532L169.336 625.034L274.378 584.79Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('PLDT-CTC Building');
            handleClick(event);
          }}
        ></path>
        {/* Gonzaga Hall */}
        <path
          d='M450.5 531.5C447.333 527 440.4 517.3 438 514.5L465 455L595.5 460V483L518.5 489V514.5L450.5 531.5Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('Gonzaga Hall');
            handleClick(event);
          }}
        ></path>
        {/* Faura */}
        <path
          d='M318 416.5L220 413.5V353.5L318 356.5V416.5Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('Faura Hall');
            handleClick(event);
          }}
        ></path>
        {/* MVP */}
        <path
          d='M360 374.5V322H441V374.5H360Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('MVP Center for Student Leadership');
            handleClick(event);
          }}
        ></path>
        {/* Faber Hall */}
        <path
          d='M454 303V216H506V303H454Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('Faber Hall');
            handleClick(event);
          }}
        ></path>
        {/* Old Rizal Library */}
        <path
          d='M370 303V212H434V303H370Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('Old Rizal Library');
            handleClick(event);
          }}
        ></path>
        {/* Berchman */}
        <path
          d='M538 406V378H630V406H538Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('Berchmans Hall');
            handleClick(event);
          }}
        ></path>
        {/* Xavier Hall */}
        <path
          d='M529.567 287.469L543.637 263.261L629.611 313.231L615.54 337.439L529.567 287.469Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('Xavier Hall');
            handleClick(event);
          }}
        ></path>
        {/* Dela Costa Hall */}
        <path
          d='M322.5 317H229.5V275H322.5V317Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('De la Costa Hall');
            handleClick(event);
          }}
        ></path>
        {/* New Rizal Library */}
        <path
          d='M189 330H127V233H189V330Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('New Rizal Library');
            handleClick(event);
          }}
        ></path>
        {/* Schmitt Hall */}
        <path
          d='M360 460V437.5H399.5V423H449.5C449.167 435.333 448.7 460.4 449.5 462C450.3 463.6 390.167 461.333 360 460Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('Schmitt Hall');
            handleClick(event);
          }}
        ></path>
        {/* Kostka Hall */}
        <path
          d='M477.5 353L475 327.5H551L554 369.5H536V353H477.5Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('Kostka Hall');
            handleClick(event);
          }}
        ></path>
        {/* JSEC */}
        <path
          d='M271 648L236.5 736.5L220 742.5L189 679.5L208 671.5L236.5 684.5L262.5 642.5L271 648Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('JSEC Mall');
            handleClick(event);
          }}
        ></path>
        {/* Leong Hall */}
        <path
          d='M192 227L160 174.5L224 141.5H254.5V171.5L214 195.5L224 210L192 227Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('Leong Hall');
            handleClick(event);
          }}
        ></path>
        {/* Arete */}
        <path
          d='M36 168.5L0 89.5L73.5 54.5L111.5 68L161.5 40L147.5 18L179.5 0L219.5 68L187.5 85L179.5 70.5L128 96.5L139.5 123.5L36 168.5Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('Arete');
            handleClick(event);
          }}
        ></path>
        {/* Social Business Building */}
        <path
          d='M266 210V145H324V210H266Z'
          fill={unselectedColor}
          onClick={() => {
            setSelectedBuilding('Social Sciences Building');
            handleClick(event);
          }}
        ></path>
      </svg>
      <svg
        id='back-arrow'
        data-name='back-arrow'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 122.88 108.06'
        style={{ scale: `0.2`, position: `absolute`, zIndex: `1001` }}
        onClick={handleUnzoomed}
      >
        <title>back-arrow</title>
        <path d='M63.94,24.28a14.28,14.28,0,0,0-20.36-20L4.1,44.42a14.27,14.27,0,0,0,0,20l38.69,39.35a14.27,14.27,0,0,0,20.35-20L48.06,68.41l60.66-.29a14.27,14.27,0,1,0-.23-28.54l-59.85.28,15.3-15.58Z' />
      </svg>
    </>
  );
}
