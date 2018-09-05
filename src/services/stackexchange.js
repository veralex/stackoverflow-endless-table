const STACK_EXCHANGE_ENDPOINT = 'https://api.stackexchange.com/2.2/questions';

/**
 * Stackexchange service class. Currently works with stackoverflow
 */
class StackExchangeService {

    /**
     * Gets questions list from stackexchange
     * @param {Object<>} parameters Some request parameters according to stackexchange /questions api
     */
    async getQuestionsList(parameters){
        const url = new URL(`${STACK_EXCHANGE_ENDPOINT}?site=stackoverflow`);
        Object.keys(parameters).forEach(key=>url.searchParams.append(key, parameters[key]));
        const data = await this.getData(url);
        return data.items.map(item=>({
            id: item.question_id,
            url: item.link,
            author: item.owner.display_name,
            title: item.title,
            created: item.creation_date
        }));
    }

    /**
     * Gets single question by id
     * @param {number} id Question id
     */
    async getQuestion(id){
        const url = new URL(`${STACK_EXCHANGE_ENDPOINT}/${id}?site=stackoverflow&filter=withbody`);
        const data = await this.getData(url);
        const [item] =  data.items;
        return {
            id: item.question_id,
            url: item.link,
            author: item.owner.display_name,
            title: item.title,
            created: item.creation_date,
            body: item.body
        }
    }

    /**
     * Gets data frow remote service
     * @param {string} url url
     */
    async getData(url){
        const response = await fetch(url,{
            headers:{
                Accept: 'application/json'
            }
        });
        if(!response.ok){
            throw new Error(`Stack exchange error, status code ${response.status}`);
        }
        const data = await response.json();
        if(!data.items){
            throw new Error(`Stack exchange request result is not ok`);
        }
        return data;
    }
}

export default new StackExchangeService();