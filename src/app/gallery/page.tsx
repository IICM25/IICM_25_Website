// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { Freehand } from "next/font/google";
// import {
//   IoIosHeart,
//   IoIosArrowBack,
//   IoIosArrowForward,
//   IoMdClose,
// } from "react-icons/io";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { getSingleDoc } from "../../lib/firebaseFirestore";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

// type ImageItem = {
//   src: string;
//   alt: string;
//   like?: number;
// };

// const freehand = Freehand({
//   subsets: ["latin"],
//   weight: "400",
// });

// export default function GalleryPage() {
//   const [totalImages, setTotalImages] = useState<ImageItem[]>([]);
//   const [galleryImages, setGalleryImages] = useState<ImageItem[]>([]);
//   const [likes, setLikes] = useState<number[]>([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [slideNumber, setSlideNumber] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch images from Firestore
//   const fetchGalleryImages = useCallback(async () => {
//     try {
//       const data = await getSingleDoc("WebContents", "Gallery");
//       if (data) {
//         const rawItems: any[] = Array.isArray(data)
//           ? data
//           : data && Array.isArray((data as any).data)
//           ? (data as any).data
//           : [];

//         const mapped = rawItems
//           .map((it: any) => {
//             const src =
//               it.IMAGE?.url ??
//               it.image?.url ??
//               it.img?.url ??
//               it.IMAGE?.Ref ??
//               it.image?.Ref ??
//               "";
//             if (!src) return null;
//             const alt =
//               it.title ?? it.caption ?? `Gallery Image ${it.Id ?? it.id ?? ""}`;
//             const like = Number(it.like ?? 0);
//             return { src, alt, like } as ImageItem | null;
//           })
//           .filter((x): x is ImageItem => x !== null);

//         const sortedImages = mapped.sort((a, b) => (b.like ?? 0) - (a.like ?? 0));

//         setTotalImages(sortedImages);
//         setGalleryImages(sortedImages.slice(0, 10));
//         setLikes(sortedImages.slice(0, 10).map((e) => e.like ?? 0));
//         setLoading(false);
//       }
//     } catch (e) {
//       console.log("Error fetching images:", e);
//     }
//   }, []);

//   useEffect(() => {
//     fetchGalleryImages();
//   }, [fetchGalleryImages]);

//   // ✅ Infinite scroll logic (loops infinitely)
//   const nextImages = (endIndex: number) => {
//     const currentImagesLength = galleryImages.length;
//     const totalLength = totalImages.length;

//     if (!totalLength) return;

//     // Loop back to start when reaching the end
//     if (currentImagesLength >= totalLength) {
//       const newImages = totalImages.slice(0, endIndex - totalLength);
//       setGalleryImages([...galleryImages, ...newImages]);
//       setLikes([...likes, ...newImages.map((e) => e.like ?? 0)]);
//     } else {
//       // Load next batch
//       const newBatch = totalImages.slice(0, endIndex);
//       setGalleryImages(newBatch);
//       setLikes(newBatch.map((e) => e.like ?? 0));
//     }
//   };

//   // ✅ Modal Controls
//   const handleOpenModal = (index: number) => {
//     setSlideNumber(index);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => setOpenModal(false);

//   const prevSlide = () => {
//     slideNumber === 0
//       ? setSlideNumber(galleryImages.length - 1)
//       : setSlideNumber(slideNumber - 1);
//   };

//   const nextSlide = () => {
//     slideNumber + 1 === galleryImages.length
//       ? setSlideNumber(0)
//       : setSlideNumber(slideNumber + 1);
//   };

//   // ✅ Like Logic
//   const handleLike = () => {
//     const selectedImage = galleryImages[slideNumber];
//     const updatedImages = [...galleryImages];
//     const updatedLikes = [...likes];

//     if (!isLiked) {
//       setIsLiked(true);
//       updatedImages[slideNumber] = {
//         ...selectedImage,
//         like: (selectedImage.like ?? 0) + 1,
//       };
//       updatedLikes[slideNumber] = updatedLikes[slideNumber] + 1;
//     } else {
//       setIsLiked(false);
//       updatedImages[slideNumber] = {
//         ...selectedImage,
//         like: Math.max(0, (selectedImage.like ?? 0) - 1),
//       };
//       updatedLikes[slideNumber] = Math.max(0, updatedLikes[slideNumber] - 1);
//     }

//     setGalleryImages(updatedImages);
//     setLikes(updatedLikes);
//   };

//   if (loading)
//     return (
//       <div className="w-screen h-screen flex items-center justify-center bg-[#0b0a22] text-pink-200">
//         Loading Gallery...
//       </div>
//     );

//   return (
//     <div className="w-full min-h-screen bg-[#e88f33] flex flex-col items-center overflow-x-hidden">
//       {/* ✅ Title */}
//       <div className="sticky top-0 z-20 bg-[#e88f33] backdrop-blur-md py-4 pt-24 text-center">
//         <h1
//           className={`${freehand.className} text-5xl md:text-6xl text-pink-300 font-bold drop-shadow-[0_0_25px_rgba(255,192,203,0.5)]`}
//         >
//           Gallery
//         </h1>
//       </div>

//       {/* ✅ Infinite Scroll Section */}
//       <InfiniteScroll
//         dataLength={galleryImages.length}
//         next={() => nextImages(galleryImages.length + 10)}
//         hasMore={true} // 🔁 Always true for infinite loop
//         loader={<p className="text-center text-pink-200 py-6">Loading...</p>}
//         className="w-full px-4"
//       >
//         <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 p-3 w-full">
//           {galleryImages.map((img, index) => (
//             <div
//               key={`${img.src}-${index}`}
//               className="relative mb-3 overflow-hidden rounded-xl cursor-pointer group"
//               onClick={() => handleOpenModal(index)}
//             >
//               <LazyLoadImage
//                 src={img.src}
//                 alt={img.alt}
//                 effect="blur"
//                 className="w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-2">
//                 {/* <p className="text-xs text-white text-center">{img.alt}</p> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </InfiniteScroll>

//       {/* ✅ Modal */}
//       {openModal && galleryImages[slideNumber] && (
//         <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
//           <IoMdClose
//             size={30}
//             onClick={handleCloseModal}
//             className="absolute top-5 right-5 text-white cursor-pointer opacity-80 hover:opacity-100"
//           />
//           <IoIosArrowBack
//             size={40}
//             onClick={prevSlide}
//             className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white cursor-pointer opacity-80 hover:opacity-100"
//           />
//           <IoIosArrowForward
//             size={40}
//             onClick={nextSlide}
//             className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white cursor-pointer opacity-80 hover:opacity-100"
//           />

//           <img
//             src={galleryImages[slideNumber].src}
//             alt={galleryImages[slideNumber].alt}
//             className="max-h-[85vh] max-w-[92vw] rounded-2xl shadow-2xl select-none transition-transform duration-300 hover:scale-105"
//           />

//           {/* <div className="absolute bottom-10 flex flex-col items-center space-y-2 text-pink-400">
//             <IoIosHeart
//               size={36}
//               onClick={handleLike}
//               className={`cursor-pointer transition-transform duration-200 ${
//                 isLiked ? "text-pink-500 scale-110" : "hover:scale-110"
//               }`}
//             />
//             <span className="text-sm text-pink-200">
//               {galleryImages[slideNumber].like}
//             </span>
//           </div> */}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState, useCallback } from "react";
import { Freehand } from "next/font/google";
import {
  IoIosHeart,
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdClose,
} from "react-icons/io";
import { getSingleDoc } from "../../lib/firebaseFirestore";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type ImageItem = {
  src: string;
  alt: string;
  like?: number;
};

const freehand = Freehand({
  subsets: ["latin"],
  weight: "400",
});

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<ImageItem[]>([]);
  const [likes, setLikes] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch images from Firestore
  const fetchGalleryImages = useCallback(async () => {
    try {
      const data = await getSingleDoc("WebContents", "Gallery");
      if (data) {
        // Normalize unknown backend shapes without using `any`.
        const hasDataArray = (x: unknown): x is { data: unknown[] } =>
          typeof x === "object" && x !== null && "data" in (x as object) && Array.isArray((x as { data?: unknown }).data);

        const rawItems: unknown[] = Array.isArray(data) ? (data as unknown[]) : hasDataArray(data) ? data.data : [];

        const pickUrl = (maybe: unknown): string | undefined => {
          if (typeof maybe === "string") return maybe;
          if (typeof maybe === "object" && maybe !== null) {
            const m = maybe as Record<string, unknown>;
            const u = m.url;
            if (typeof u === "string") return u;
            const r = m.Ref;
            if (typeof r === "string") return r;
          }
          return undefined;
        };

        const mapped = rawItems
          .map((it) => {
            if (typeof it !== "object" || it === null) return null;
            const rec = it as Record<string, unknown>;
            const src =
              pickUrl(rec.IMAGE) ?? pickUrl(rec.image) ?? pickUrl(rec.img) ?? "";
            if (!src) return null;
            const alt =
              (typeof rec.title === "string"
                ? rec.title
                : typeof rec.caption === "string"
                ? rec.caption
                : `Gallery Image ${typeof rec.Id === "string" ? rec.Id : typeof rec.id === "string" ? rec.id : ""}`) || "";
            const like = typeof rec.like === "number" ? rec.like : (typeof rec.like === "string" && !Number.isNaN(Number(rec.like)) ? Number(rec.like) : 0);
            return { src, alt, like } as ImageItem | null;
          })
          .filter((x): x is ImageItem => x !== null);

        const sortedImages = mapped.sort((a, b) => (b.like ?? 0) - (a.like ?? 0));

        setGalleryImages(sortedImages);
        setLikes(sortedImages.map((e) => e.like ?? 0));
        setLoading(false);
      }
    } catch (e) {
      console.log("Error fetching images:", e);
    }
  }, []);

  useEffect(() => {
    fetchGalleryImages();
  }, [fetchGalleryImages]);

  // ✅ Modal Controls
  const handleOpenModal = (index: number) => {
    setSlideNumber(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const prevSlide = () => {
    slideNumber === 0
      ? setSlideNumber(galleryImages.length - 1)
      : setSlideNumber(slideNumber - 1);
  };

  const nextSlide = () => {
    slideNumber + 1 === galleryImages.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1);
  };

  // ✅ Like Logic
  const handleLike = () => {
    const selectedImage = galleryImages[slideNumber];
    const updatedImages = [...galleryImages];
    const updatedLikes = [...likes];

    if (!isLiked) {
      setIsLiked(true);
      updatedImages[slideNumber] = {
        ...selectedImage,
        like: (selectedImage.like ?? 0) + 1,
      };
      updatedLikes[slideNumber] = updatedLikes[slideNumber] + 1;
    } else {
      setIsLiked(false);
      updatedImages[slideNumber] = {
        ...selectedImage,
        like: Math.max(0, (selectedImage.like ?? 0) - 1),
      };
      updatedLikes[slideNumber] = Math.max(0, updatedLikes[slideNumber] - 1);
    }

    setGalleryImages(updatedImages);
    setLikes(updatedLikes);
  };

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#0b0a22] text-pink-200">
        Loading Gallery...
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-[#e88f33] flex flex-col items-center overflow-x-hidden">
      {/* ✅ Title */}
      <div className="sticky top-0 z-20 bg-[#e88f33] backdrop-blur-md py-4 pt-24 text-center">
        <h1
          className={`vintage-title text-5xl md:text-6xl text-pink-300 font-bold drop-shadow-[0_0_25px_rgba(255,192,203,0.5)]`}
        >
          Gallery
        </h1>
      </div>

      {/* ✅ Gallery Grid */}
      <div className="w-full px-4">
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 p-3 w-full">
          {galleryImages.map((img, index) => (
            <div
              key={`${img.src}-${index}`}
              className="relative mb-3 overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => handleOpenModal(index)}
            >
              <LazyLoadImage
                src={img.src}
                alt={img.alt}
                effect="blur"
                className="w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-2" />
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Modal */}
      {openModal && galleryImages[slideNumber] && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[9999]">
          <IoMdClose
            size={30}
            onClick={handleCloseModal}
            className="absolute top-5 right-5 text-white cursor-pointer opacity-80 hover:opacity-100"
          />
          <IoIosArrowBack
            size={40}
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white cursor-pointer opacity-80 hover:opacity-100"
          />
          <IoIosArrowForward
            size={40}
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white cursor-pointer opacity-80 hover:opacity-100"
          />

          <img
            src={galleryImages[slideNumber].src}
            alt={galleryImages[slideNumber].alt}
            className="max-h-[85vh] max-w-[92vw] rounded-2xl shadow-2xl select-none transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
    </div>
  );
}
