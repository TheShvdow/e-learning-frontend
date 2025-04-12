/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/lib/api';

export const formationService = {
  async getAllFormations() {
    const res = await axios.get('/formations');
    return res.data;
  },
  async getFormationById(id: number) {
    const res = await axios.get(`/formations/${id}`);
    return res.data;
  },
  async createFormation(formation: any) {
    const res = await axios.post('/formations/create', formation);
    return res.data;
  },
  async updateFormation(id: number, formation: any) {
    const res = await axios.put(`/formations/update/${id}`, formation);
    return res.data;
  },
  async deleteFormation(id: number) {
    const res = await axios.delete(`/formations/delete/${id}`);
    return res.data;
  },
  async getFormationCount() {
    const res = await axios.get('/formations/count');
    return res.data;
  }
};
