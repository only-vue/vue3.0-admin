<template>
   <section class="upload-panel">
      <a-upload
         v-model:file-list="fileList"
         action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
         list-type="picture-card"
         :accept="uploadData.accept"
         method="post"
         :data="uploadData.data"
         @preview="handlePreview"
      >
         <div v-if="fileList.length < 8">
            <plus-outlined />
            <div class="ant-upload-text">上传</div>
         </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
         <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
     
   </section>
</template>

<script>
import { ref, reactive, toRaw ,watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);
  });
}

export default {
  name: 'Upload',
  props:{
      uploadData:{
         type:Object
      }
  },
  setup(props, context) {
    const previewVisible = ref(false);
    const previewImage = ref('');
    const fileList = ref(props.uploadData.list||[]);

    const handleCancel = () => {
      previewVisible.value = false;
    };

    const handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
    };

    const handleChange = ({
      fileList: newFileList,
    }) => {
      fileList.value = newFileList;
    };

    return {
      previewVisible,
      previewImage,
      fileList,
      handleCancel,
      handlePreview,
      handleChange,
    };
  }
}
</script>

<style lang="less">

</style>
