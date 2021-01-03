import config from '../config/config';
import AxiosService from './axios-service'

class EmployeeService {
    baseUrl = config.baseUrl;
    
    async addEmployee(data){
        return await AxiosService.postService(`${this.baseUrl}employees`, data);
    }

    async getAllEmployee(){
        return await AxiosService.getService(`${this.baseUrl}employees`);
    }

    async deleteEmployee(id){
        return await AxiosService.deleteService(`${this.baseUrl}employees/`+id);
    }

    async getEmployee(id){
        return await AxiosService.getService(`${this.baseUrl}employees/`+id);
    }

    async updateEmployee(id, data){
        return await AxiosService.putService(`${this.baseUrl}employees/`+id, data);
    }
}

export default new EmployeeService();