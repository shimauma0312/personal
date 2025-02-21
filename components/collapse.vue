<template>
    <el-collapse v-model="activeNames">
        <el-collapse-item title="Consistency" name="1">
            <p>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
            </p>
        </el-collapse-item>
        <el-collapse-item title="Feedback" name="2">
            <p>
                Consistent within interface: all elements should be consistent, such
                as: design style, icons and texts, position of elements, etc.
            </p>
        </el-collapse-item>
        <el-collapse-item title="Efficiency" name="3">
            <p>
                Operation feedback: enable the users to clearly perceive their
                operations by style updates and interactive effects;
            </p>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
const activeNames = ref(['1'])
</script>
