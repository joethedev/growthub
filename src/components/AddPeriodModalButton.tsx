'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddPeriod from './AddPeriod';

export default function AddPeriodModalButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/80 transition"
      >
        + Add Period
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />

            {/* Modal */}
            <motion.div
              className="fixed z-50 inset-0 flex items-center justify-center p-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
            >
              <div
                className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-xl w-full max-w-lg relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute top-3 right-3 text-xl"
                  onClick={handleClose}
                >
                  ×
                </button>

                {/* AddPeriod Form */}
                <AddPeriod />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
