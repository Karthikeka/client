import axios from 'axios';

const API_URL = 'http://localhost:8000'


const API_GMAIL = async (serviceUrlObject, requestData = {}, type) => {
    const { params, urlParams, ...body } = requestData;

    return await axios({
        method: 'delete',
        url: `${API_URL}/${serviceUrlObject.endpoint}/${type}`,
        data: requestData
    })
}

export default API_GMAIL;