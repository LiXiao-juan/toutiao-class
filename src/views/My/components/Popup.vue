<template>
  <div>
    <div style="margin-top: 80px; background-color: #000 ; height: 100%;">
      <img :src="imgSrc" alt="" ref="img" style="width: 375px; height: 480px" />
      <span @click="imgConfirm" class="confirm">确认</span>
      <span @click="imgCancel" class="cancel">取消</span>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { editUserHeadPortrait } from '@/api/user'
export default {
  props: ['imgSrc'],
  mounted() {
    const img = this.$refs.img

    this.myCropper = new Cropper(img, {
      viewMode: 1,
      background: false,
      highlight: false,
      scalable: true
    })
  },
  methods: {
    imgConfirm() {
      const fm = new FormData()
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        fm.append('photo', blob)
        try {
          await editUserHeadPortrait(fm)
          this.$toast.success('更改头像成功')
        } catch (error) {
          this.$toast.fail('更改头像失败')
        } finally {
          this.$emit('change', false)
        }
      })
    },
    imgCancel() {
      // this.$parent.isShowImg = false
      // console.log(this.$parent.isShowImg)
      this.$emit('change')
      // location.reload()
    }
  }
}
</script>

<style scoped lang="less">
.confirm {
  position: fixed;
  z-index: 999;
  right: 0;
  bottom: 0;
  color: #fff;
  font-size: 30px;
}
.cancel {
  position: fixed;
  z-index: 99999;
  left: 0;
  bottom: 0;
  color: #fff;
  font-size: 30px;
}
</style>
