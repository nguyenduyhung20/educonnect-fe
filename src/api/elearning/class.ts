import { apiGet, apiPost, apiDelete, apiPatch } from 'src/utils/api-request';

export class ClassApi {
  static async getSubject() {
    return await apiGet(`/elearning/subject`);
  }

  static async getClassStudentLearning() {
    return await apiGet(`/elearning/class`);
  }

  static async getSubjectOfClass(classId: number) {
    return await apiGet(`/elearning/class/${classId}/subject`);
  }

  static async getTeacherOfClass(classId: number) {
    return await apiGet(`/elearning/class/${classId}/teacher`);
  }

  static async getStudentOfClass(classId: number) {
    return await apiGet(`/elearning/class/${classId}/student`);
  }

  // Manager class
  static async postClass(request) {
    return await apiPost('/elearning/class', request);
  }
  
  static async updateClass(request) {
    return await apiPatch(`/elearning/class/${request.id}`, request);
  }
  
  static async deleteClass(classId: number) {
    return await apiDelete(`/elearning/class/${classId}`, {});
  }

  // Subject
  static async postSubjectToClass(classId, request) {
    return await apiPost(`/elearning/class/${classId}/subject`, request);
  }
  
  static async updateSubjectInClass(classId, request) {
    return await apiPatch(`/elearning/class/${classId}/subject/${request.id}`, request);
  }
  
  static async deleteSubjectInClass({classId, subjectId}) {
    return await apiDelete(`/elearning/class/${classId}/subject/${subjectId}`, {});
  }

  // Student in class
  static async addStudentToClass(classId, request) {
    return await apiPost(`/elearning/class/${classId}/student`, request);
  }
  
  static async deleteStudentInClass({classId, studentId}) {
    return await apiDelete(`/elearning/class/${classId}/student/${studentId}`, {});
  }
  
  // Document
  static async getDocumentOfSubjectAndClass({classId, subjectId}) {
    return await apiGet(`/elearning/class/${classId}/subject/${subjectId}/document`);
  }

  static async createDocumentOfSubjectAndClass({classId, subjectId}, data) {
    return await apiPost(`/elearning/class/${classId}/subject/${subjectId}/document`, data);
  }

  static async updateDocument(data) {
    console.log(data);
    return await apiPatch(`/elearning/document/${data.id}`, data)
  }

  static async deleteDocument(documentId) {
    return await apiDelete(`/elearning/document/${documentId}`, {})
  }

  // School
  static async getUserOfSchool(type) {
    switch (type) {
      case 'teacher':
        return await apiGet(`/elearning/school/teacher`);
      case 'student':
        return await apiGet(`/elearning/school/student`);
      default:
        return await apiGet(`/elearning/school/parent`);
    }
  }

  static async searchUser(name) {
    return await apiGet(`/elearning/school/search/user?name=${name}`);
  }

  // User
  static async deleteUser(userId) {
    return await apiDelete(`/elearning/user/${userId}`, {});
  } 

  static async updateUser(data) {
    return await apiPatch(`/elearning/user`, data);
  } 

  static async createUser(data) {
    return await apiPost(`/elearning/user`, data);
  } 
}
