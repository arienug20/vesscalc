import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import type { VesselProject, AppSettings } from '@/types';

// Custom IndexedDB storage for Zustand persist
const idbStorage = {
  getItem: async (name: string) => {
    const value = await get(name);
    return value ?? null;
  },
  setItem: async (name: string, value: unknown) => {
    await set(name, value);
  },
  removeItem: async (name: string) => {
    await del(name);
  }
};

interface VesselStore {
  projects: VesselProject[];
  activeProjectId: string | null;

  createProject: (project: Omit<VesselProject, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateProject: (id: string, updates: Partial<VesselProject>) => void;
  deleteProject: (id: string) => void;
  setActiveProject: (id: string | null) => void;
  getActiveProject: () => VesselProject | undefined;
}

export const useVesselStore = create<VesselStore>()(
  persist(
    (set, get) => ({
      projects: [],
      activeProjectId: null,

      createProject: (projectData) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const project: VesselProject = {
          ...projectData,
          id,
          createdAt: now,
          updatedAt: now
        };
        set((state) => ({ projects: [...state.projects, project] }));
        return id;
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          )
        }));
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          activeProjectId: state.activeProjectId === id ? null : state.activeProjectId
        }));
      },

      setActiveProject: (id) => set({ activeProjectId: id }),

      getActiveProject: () => {
        const state = get();
        return state.projects.find((p) => p.id === state.activeProjectId);
      }
    }),
    {
      name: 'vesscalc-vessels',
      storage: createJSONStorage(() => idbStorage)
    }
  )
);

interface HXStore {
  projects: any[];
  activeProjectId: string | null;

  createProject: (data: any) => string;
  updateProject: (id: string, updates: Partial<any>) => void;
  deleteProject: (id: string) => void;
  setActiveProject: (id: string | null) => void;
  getActiveProject: () => any;
}

export const useHXStore = create<HXStore>()(
  persist(
    (set, get) => ({
      projects: [],
      activeProjectId: null,

      createProject: (data) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const project = {
          ...data,
          id,
          createdAt: now,
          updatedAt: now
        };
        set((state) => ({
          projects: [...state.projects, project]
        }));
        return id;
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          )
        }));
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          activeProjectId: state.activeProjectId === id ? null : state.activeProjectId
        }));
      },

      setActiveProject: (id) => set({ activeProjectId: id }),

      getActiveProject: () => {
        const state = get();
        return state.projects.find((p) => p.id === state.activeProjectId);
      }
    }),
    {
      name: 'vesscalc-hx',
      storage: createJSONStorage(() => idbStorage)
    }
  )
);

export const useSettingsStore = create<AppSettings>()(
  persist(
    (set) => ({
      units: 'metric',
      language: 'en',
      defaultMaterial: 'SA-516 Gr.70',
      defaultJointEfficiency: 1.0,
      defaultCorrosionAllowance: 3.0,
      theme: 'system',
      autoRecalculate: true,
      showFormulas: true,
      decimalPlaces: 2,
      companyName: '',
      engineerName: ''
    }),
    { name: 'vesscalc-settings' }
  )
);