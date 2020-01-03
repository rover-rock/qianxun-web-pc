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