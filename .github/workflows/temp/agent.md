# Hermes Agent
##创建智能体
hermes profile create mushroom


## 上下文
使用三类长期上下文塑造不同的Agent行为
### Soul: SOUL.md
agent自己的身份、人格、总行为准则，会被当做system prompt的第一层。
适合写：Agent是谁，整体语气、工作风格、长期角色定位
不适合写：临时任务、项目细节、用户个人信息

### User profile ：USER.md
是“关于用户是谁”的资料，描述用户的身份、偏好、沟通风格、语气和工作习惯，并会作为 USER PROFILE (WHO THE USER IS)注入system prompt
适合写：用户是谁。用户喜欢什么语言和回答风格。用户喜欢Agent如何称呼自己。用户的稳定偏好、喜欢和禁忌。

### My notes
Agent的个人笔记，对应MEMORY.md，它记录环境事实、项目约定、工具怪癖、任务场景和学到的长期经验，并作为MEMORY (your personal notes)注入system prompt
适合：
当前运行环境;这个Agent长期负责什么任务；遇到什么情况应该优先做什么；哪些知识、技能或约定需要下次继续记住


