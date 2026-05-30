import { create } from 'zustand';
import type { VesselProject, AppSettings } from '@/types';

interface VesselState {
  projects: VesselProject[];
  activeProjectId: string | null;
}

interface VesselActions {
  createProject: (project: Omit<VesselProject, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateProject: (id: string, updates: Partial<VesselProject>) => void;
  deleteProject: (id: string) => void;
  setActiveProject: (id: string | null) => void;
  getActiveProject: () => VesselProject | undefined;
}

type VesselStore = VesselState & VesselActions;

export const useVesselStore = create<VesselStore>((set, get) => ({
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
}));

interface HXProject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

interface HXState {
  projects: HXProject[];
  activeProjectId: string | null;
}

interface HXActions {
  createProject: (data: Record<string, unknown>) => string;
  updateProject: (id: string, updates: Partial<HXProject>) => void;
  deleteProject: (id: string) => void;
  setActiveProject: (id: string | null) => void;
  getActiveProject: () => HXProject | undefined;
}

type HXStore = HXState & HXActions;

export const useHXStore = create<HXStore>((set, get) => ({
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
}));

export const useSettingsStore = create<AppSettings>(() => ({
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
}));