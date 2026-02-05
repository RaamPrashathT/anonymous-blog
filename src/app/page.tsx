"use client"

import {redirect} from "next/navigation";

export default function Home() {
    redirect("/Blogs")
    // return (
    //     <div
    //         className="bg-black"
    //         style={{ width: '100%', height: '100%', position: 'relative' }}>
    //         <LightRays
    //             raysOrigin="top-center"
    //             raysColor="#ffffff"
    //             raysSpeed={1}
    //             lightSpread={0.5}
    //             rayLength={3}
    //             followMouse={true}
    //             mouseInfluence={0.1}
    //             noiseAmount={0}
    //             distortion={0}
    //             className="custom-rays"
    //             pulsating={false}
    //             fadeDistance={1}
    //             saturation={1}
    //         />
    //     </div>
    // )
}