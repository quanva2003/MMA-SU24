module.exports = {
  getProvinces: async (req, res) => {
    await fetch("https://vapi.vnappmob.com/api/province")
      .then((res) => res.json())
      .then((data) => {
        res.send(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getDistricts: async (req, res) => {
    const provinceId = req.params.province_id;
    await fetch(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
      .then((res) => res.json())
      .then((data) => {
        res.send(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getWards: async (req, res) => {
    const districtId = req.params.district_id;
    await fetch(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
      .then((res) => res.json())
      .then((data) => {
        res.send(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
