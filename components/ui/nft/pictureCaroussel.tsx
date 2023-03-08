import {createRef, RefObject, useState} from "react";
import {Carousel} from "react-responsive-carousel";


const PictureCarousel = ({images}: { images: string[] }) => {



        // @ts-ignore
    return (
            // Images are placed using inline flex. We then wrap an image in a div
            // with flex-shrink-0 to stop it from 'shrinking' to fit the outer div.
            // Finally the image itself will be 100% of a parent div. Outer div is
            // set with position relative, so we can place our cotrol buttons using
            // absolute positioning on each side of the image.
            <div className="p-12  justify-center w-screen md:w-1/2 items-center">

                   {images.map((image) => (

                       <img key={image} src={image} />
                   ))}


            </div>
        );
};



export default PictureCarousel;
