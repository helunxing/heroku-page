# Time Agreement: Backend for Frontend

This page is for the Time Agreement web app project, 
specifically its Backend for Frontend (or called BBF) part 
and project overall structure.

This project is deployed at: <https://hlx.codes>

Other parts introduction for this project:

[front end](./client/README.md)

[microservices backend](https://github.com/helunxing/microservices-backend)

## overall structure

图片

frontend访问BBF提供的restful api, 由BBF访问Microservices，并返回数据给frontend。

我选择此种结构的原因：

有BBF使Microservices API更简洁，不易与前端的功能更改互相影响，且安全。frontend的更改时常是需要联动对API做更改： 
假设前端功能A依赖于微服务X的API，前端功能B依赖于微服务Y的API。如果对A进行更改，使得其需要一些来自于微服务Y的数据。
如果没有BBF层存在，那么有两个方案：Y提供一个新接口给A，或者X从Y获得数据，并更改自己的API以满足A的更改。
当BBF的存在，X和Y可以只需要提供固定的接口，将不同来源的数据整合在一起，满足A的更改的任务放在BBF层进行。

这样做的好处是：
Microservices可以专注于自己的功能，只提供简洁的基本API，不会被前端的小修改影响。
保证了系统安全性。减少frontend获得其完成其功能所不必要的多余数据。BBF的数据和处理逻辑不会被用户编辑，安全性较前端直接访问微服务更高。

为什么BBF不是以一个新的微服务的形式存在的？如果在团队中，责任的边界（在这里是Microservices的API交互）越清晰越好。
对一个人负责所有功能也是一样的。
将BBF独立于Microservices的意义是将其纳入开发前端时的视角思考，更改前端功能时，在保证API不变的前提下，不需要考虑前端。
反之亦然。
