"use client";

import React from "react";
import { useEditor } from "../../context/EditorContext";
import { Button } from "../ui/button";
import { Save, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function InlineEditor() {
    const { isEditable, hasChanges, saveChanges, discardChanges } = useEditor();

    if (!isEditable) return null;

    return (
        <AnimatePresence>
            {hasChanges && (
                <motion.div
                    initial={{ y: 100, x: "-50%", opacity: 0 }}
                    animate={{ y: -40, x: "-50%", opacity: 1 }}
                    exit={{ y: 100, x: "-50%", opacity: 0 }}
                    className="fixed bottom-0 left-1/2 z-[100] flex items-center gap-4 bg-zinc-900/90 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-full shadow-2xl shadow-black/50"
                >
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-sm">Unsaved Changes</span>
                        <span className="text-zinc-500 text-xs">Hover elements to edit</span>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={discardChanges}
                            className="text-zinc-400 hover:text-white"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Discard
                        </Button>
                        <Button
                            size="sm"
                            onClick={saveChanges}
                            className="bg-primary hover:bg-red-700 text-white font-bold"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
