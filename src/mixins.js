import util from "@/libs/util";

export let pager_mixin = {
    methods:{
        changePage(page_num) {
            this.current_page = page_num;
            this.search_with_params();
        },
          changePageSize(per_page_count) {
            this.page_size = per_page_count;
            this.current_page = 1;
            this.search_with_params();
        },
    }
}

export let time_mixin = {
    data(){
        return {
            keywords:{
                start:util.format(new Date('1990-01-01').toLocaleDateString()),
                end:util.format(new Date(Date.now()+60*60*1000*24).toLocaleDateString())
            },
            datespan:[new Date('1990-01-01'),new Date(Date.now()+60*60*1000*24)]
        }
    },
    watch:{
        datespan(value){
            this.keywords.start = util.format(this.datespan[0]);
            this.keywords.end = util.format(this.datespan[1]);
        }
    }
}