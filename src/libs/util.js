export default {
  get_page_data(data, current_page, page_size) {
    return data.slice((current_page - 1) * page_size, current_page * page_size);
  },
  render_keywords_red(keywords, text) {
    if(!keywords) return text;
    let segments = text.split(keywords);
    let str = "";
    segments.forEach((seg, index) => {
      if (index !== segments.length - 1)
        str += `${seg}<span style='color:red'>${keywords}</span>`;
      else str += seg;
    });
    return str;
  },

  format(date) {
    date = new Date(date).toLocaleDateString("ch", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    return date.replace(/\//g, "-");
  }
}

export function a(){
  console.log('aaaaaa')
}
