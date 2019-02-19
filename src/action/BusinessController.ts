import BusinessService from '../service/BusinessService';

class BusinessController {

  public addPostInf = async (params: any): Promise<any> => {

    const result = await BusinessService.addPostInf(params);
    console.log('result:', result);
  }
}

export default new BusinessController();