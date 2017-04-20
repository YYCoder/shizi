<div class="drop btn">
	<span class="selected"
				@click.self="itemShow = !itemShow"
				v-text="dropName"
	></span>
	<span class="border-pointer"
			  :class="{ rotated: itemShow }"
			  @click.self="itemShow = !itemShow"
  ></span>
	<transition name="item">
		<div class="selection item" v-show="itemShow">
			<div class="option" v-for="item in items"
													@click="clickItem(item)">{{item.name}}</div>
		</div>
	</transition>
</div>
