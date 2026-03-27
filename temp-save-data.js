const axios = require('axios');
const fs = require('fs');

const ASANA_TOKEN = '2/1213230135608775/1213807263652028:fe420ddf840fac4c7cb0c1d98bf0611a';
const PROJECT_GID = '1206418467135456';

const asanaApi = axios.create({
    baseURL: 'https://app.asana.com/api/1.0',
    headers: {
        Authorization: `Bearer ${ASANA_TOKEN}`,
    },
});

async function fetchData() {
    try {
        const response = await asanaApi.get(`/projects/${PROJECT_GID}/custom_field_settings`, {
            params: {
                opt_fields: 'custom_field.name,custom_field.enum_options.name,custom_field.enum_options.enabled,custom_field.enum_options.gid',
            },
        });

        const settings = response.data.data;
        const result = {};

        const fieldsToFetch = ['CATEGORIA', 'HD', 'SSD', 'STATUS', 'MARCA', 'MODELO'];

        fieldsToFetch.forEach(fieldName => {
            const field = settings.find(s => s.custom_field?.name?.toUpperCase() === fieldName.toUpperCase());
            if (field && field.custom_field.enum_options) {
                result[fieldName] = field.custom_field.enum_options
                    .filter(opt => opt.enabled)
                    .map(opt => ({ name: opt.name, gid: opt.gid }));
            } else {
                result[fieldName] = [];
            }
        });

        fs.writeFileSync('asana-data.json', JSON.stringify(result, null, 2));
        console.log('Data saved to asana-data.json');

    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
}

fetchData();
