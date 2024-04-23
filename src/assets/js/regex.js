export const reg_4_digit = /^\d{4}$/;
export const reg_number_1_to_4 = /^[1-4]$/;
export const reg_email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
export const reg_url =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
export const reg_ip =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
export const reg_html_tag = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/;
