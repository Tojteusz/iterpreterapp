import { StateCreator } from "zustand";
import { Command } from "@components/code/code.types";

export interface CodeState {
  code: Command[];
  setCode: (code: Command[]) => void;
}

const codeSlice: StateCreator<CodeState, [], []> = (set) => ({
  code: [],
  setCode: (code) => set({ code }),
});

export default codeSlice;
