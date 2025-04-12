import axios from '@/lib/api';

export const tutorialService = {
  async getByFormationId(formationId: number) {
    const res = await axios.get(`/tutorials/formation/${formationId}`);
    return res.data;
  },
  async getAll() {
    const res = await axios.get('/tutorials');
    console.log(res.data);
    return res.data;
  },
};
