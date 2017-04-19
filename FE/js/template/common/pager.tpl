<div class="pager-container" v-if="pageNumber > 0">
		<div class="page-control">
			<div class="prev"
					 :class="{ disabled: curPage == 1 }"
					 @click="prev"
			>上一页</div>
			<div class="page"
					 :class="{ active: curPage == n }"
					 v-for="n in pageNumber"
					 @click="go(n)"
			>{{n}}</div>
			<div class="next"
					 :class="{ disabled: curPage == pageNumber }"
					 @click="next"
			 >下一页</div>
		</div>
		<div class="leap-control">
			跳转到<input type="number" min=0 class="page-inp" v-model="goPage">页, 共有<span class="page-number">{{pageNumber}}</span>页
			<div class="leap btn" @click="go(goPage)">跳转</div>
		</div>
	</div>
</div>
