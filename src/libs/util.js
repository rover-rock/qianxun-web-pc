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
  render_multi_keywords_red( keywords, text){
    if(!keywords) return text;
    let keys = keywords.split(/\s/)
    let result = text
    keys.forEach( key => {
      result = this.render_keywords_red( key, result)
    })
    return result;
  },

  format(date) {
    date = new Date(date).toLocaleDateString("ch", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
    return date.replace(/\//g, "-");
  },

  format_number(num){
    var result = [], counter = 0;
      num = (num || 0).toString().split('');
      for (var i = num.length - 1; i >= 0; i--) {
      counter++;
      result.unshift(num[i]);
      if (!(counter % 3) && i != 0) { result.unshift(','); }
      }
      return result.join('');
  }
}

export function a(){
  console.log('aaaaaa')
}
