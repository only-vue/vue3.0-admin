<template>
	<div>
	   <Editor 
			:editorData="useData.editorData"
		/>  
	</div>
</template>
<script>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Editor from '@/components/Editor/index.vue'
export default {
	name: 'editor',
	components: {
	   Editor
	},
	setup() {
		// data
		const store = useStore()
		const router = useRouter()
		const route = useRoute()
		const useData=reactive({
			editorData:'123'
		})
		return {
			useData
		}
	}
}
</script>

<style lang="less" scoped>
@bg-dark: #293146;
.jc-login {
	overflow: hidden;
	height: 100%;
	padding: 0 16px;
	position: relative;
	&::before {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		margin-left: -48%;
		background-image: url('../../assets/svg/login-bg.svg');
		background-position: 100%;
		background-repeat: no-repeat;
		background-size: auto 100%;
		content: '';
	}
	.container {
		margin: 0 auto;
		height: 100%;
		box-sizing: border-box;
		.wrapper {
			display: flex;
			height: 100%;
			.login-logo {
				position: absolute;
				top: 8px;
				display: none;
				p {
					color: #fff;
					img {
						width: 30px;
						vertical-align: -7px;
					}
					span {
						font-weight: bold;
						font-size: 16px;
						display: inline-block;
						padding-left: 5px;
					}
				}
			}
			.flex-item {
				width: 50%;
			}
			.login-info {
				position: relative;
				.info-box {
					position: absolute;
					top: 50%;
					color: #fff;
					margin-top: -159px;
					img {
						width: 45%;
						vertical-align: middle;
					}
					h1 {
						margin: 56px 0 20px 0;
						font-weight: normal;
						color: #fff;
					}
				}
			}
			.login-form {
				position: relative;
				.form-box {
					position: absolute;
					top: 50%;
					margin-top: -168px;
					margin-left: 90px;
					width: 400px;
					.login-title {
						margin-bottom: 20px;
					}
					.btn-login {
						width: 100%;
					}
				}
			}
		}
	}
}
@media screen and (max-width: 1199px) {
	.jc-login {
		background-color: @bg-dark;
		&::before {
			background: none;
		}
		.container {
			.wrapper {
				display: block;
				.login-logo {
					display: block;
				}
				.login-info {
					display: none;
				}
				.login-form {
					position: static;
					.form-box {
						left: 50%;
						margin-left: -200px;
						padding-left: 0;
						background: #fff;
						padding: 40px 30px;
						border-radius: 6px;
						.login-title {
							text-align: center;
						}
					}
				}
			}
		}
	}
}
@media screen and (min-width: 1200px) {
	.container {
		max-width: 1200px;
	}
}
@media screen and (min-width: 1500px) {
	.container {
		max-width: 1500px;
	}
}
@media screen and (min-width: 1600px) {
	.container {
		max-width: 1600px;
	}
}
.loop1(@n, @i: 1) when (@i =< @n ) {
	.enter-x-l:nth-child(@{i}) {
		opacity: 0;
		z-index: @i;
		animation: enter-x-l-animation 0.4s ease-in-out 0.3s;
		animation-fill-mode: forwards;
		animation-delay: @i * 0.1s;
	}
	.loop1(@n, (@i + 1));
}
.loop2(@n, @i: 1) when (@i =< @n ) {
	.enter-x-r:nth-child(@{i}) {
		opacity: 0;
		z-index: @i;
		animation: enter-x-r-animation 0.4s ease-in-out 0.3s;
		animation-fill-mode: forwards;
		animation-delay: @i * 0.1s;
	}
	.loop2(@n, (@i + 1));
}
.loop1(5);
.loop2(3);
@keyframes enter-x-r-animation {
	from {
		transform: translateX(0);
	}
	to {
		opacity: 1;
		transform: translateX(50px);
	}
}
@keyframes enter-x-l-animation {
	from {
		transform: translateX(50px);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
</style>