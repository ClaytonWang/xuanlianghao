# xuanlianghao

1,代码修改好后,在HBuildX运行菜单下选择H5发布
2,git提交所有的文件,包括发布的 文件
3,github actions 打包成docker image
4,进服务器
``` docker-compose pull
	
	docker-compose stop xuanlianghao
	
	docker-compose create  xuanlianghao
	
	docker-compose start  xuanlianghao
	```