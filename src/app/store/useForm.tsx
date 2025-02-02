import { create } from "zustand";

interface Form {
  name: string;
  content: string;
}

interface FormState {
  form: Form;
  setForm: (form: Partial<Form>) => void;
  resetForm: ()=>void;
}

const defaultState = () => ({ name: "", content: "" });

export const useFormStore = create<FormState>((set) => ({
  form: defaultState(),
  setForm: (partialForm) =>
    set((state) => ({
      form: { ...state.form, ...partialForm },
    })),
  resetForm: () =>
    set(() => ({
      form: defaultState(),
    })),
}));