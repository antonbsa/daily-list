const api = require("../api");

module.exports = {
  getDailyData: async (dailyId, res) => {
    try {
      const { data: response } = await api.get(`/daily/data/${dailyId}`);
      const { success, data } = response;
      if (!success) throw new Error;

      return data;
    } catch (err) {
      console.log(err);
      return res.status(400).send('Error getting meeting data');
    }
  }
}
