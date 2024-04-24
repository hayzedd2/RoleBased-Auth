"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  motion,
  AnimatePresence,
  useAnimationControls,
  useInView,
} from "framer-motion";
import { useState } from "react";
const MotionDiv = () => {
  const [isVisible, setIsVisible] = useState(true);
  const controls = useAnimationControls();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const expandDiv = () => {
    controls.start("expand");
  };

  const MotionButton = motion(Button);
  return (
    <>
      <main >
        <MotionButton
          whileTap={{ scale: 0.8 }}
          onClick={() => setIsVisible(!isVisible)}
          layout
        >
          Voila
        </MotionButton>
        <AnimatePresence mode="popLayout">
          {isVisible && (
            <motion.div
              className="w-[20rem] p-3  bg-white rounded-[8px]"
              initial={{
                scale: 0,
                opacity: 0,
                // y: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                // y: [0, 150, -150, -150, 0],
              }}
              exit={{
                scale: 0,
                opacity: 0,
                // y: 0,
              }}
              transition={{
                duration: 1,
                ease: "backInOut",
                // times: [0, 0.25, 0.5, 0.85, 1],
              }}
            >
              <Textarea className="resize-none shadow-[#000]"></Textarea>
              <div className="w-full flex items-end justify-end">
                <Button size={"sm"} className="mt-3 rounded-[6px]">
                  Send a message
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <section>
          <MotionButton
            whileTap={{ scale: 0.8 }}
            size={"sm"}
            className="mt-3 rounded-[6px]"
          >
            Tap me
          </MotionButton>
          <motion.div
            variants={{
              initial: { width: "4rem", height: "7rem" },
              expand: {
                width: "16rem",
                height: "9rem",
              },
            }}
            initial="initial"
            animate={controls}
            className="mt-4 bg-black rounded-[8px] flex items-center justify-center "
          >
            <motion.div
              className="rounded-full w-10 h-10 bg-white"
              onClick={expandDiv}
            ></motion.div>
          </motion.div>
        </section>
      </main>
      <section className="bg-white flex min-h-screen items-center justify-center">
        <motion.div
          className="bg-black w-[22rem] h-[14rem] rounded-[6px]"
          ref={ref}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{duration : 0.8}}
        ></motion.div>
      </section>
    </>
  );
};

export default MotionDiv;
