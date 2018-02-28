var box = angular.module("pro",["ionic"]);
	//定义控制器类
	box.controller("demo",demo);
	box.controller("first",first);
	box.controller("second",second);
	box.controller("third",third);
	box.controller("fourth",fourth);
	box.controller("detail",detail);
	box.controller("login",login);
	box.controller("register",register);
	//引入参数
	demo.$inject=["$scope","$state","$http","$interval","$location","$rootScope","$cacheFactory"];
	first.$inject=["$scope","$http","$ionicSlideBoxDelegate","$location","$rootScope","$state","$timeout"];
	second.$inject=["$scope","$http","$location","$rootScope","$state"];
	third.$inject=["$scope","$http","$location","$rootScope","$state"];
	fourth.$inject=["$scope","$http","$location","$rootScope","$state","$timeout","$cacheFactory"];
	detail.$inject=["$scope","$http","$location","$rootScope","$stateParams","$state","$ionicNavBarDelegate","$cacheFactory"];
	login.$inject=["$scope","$http","$location","$rootScope","$state","$ionicNavBarDelegate","$timeout"];
	register.$inject=["$scope","$http","$location","$rootScope","$state","$ionicNavBarDelegate","$timeout","$cacheFactory"];
	//路由
	box.config(function($stateProvider){
		$stateProvider.state("shouye",{
				url : "/shouye",
				templateUrl : "html/shouye.html",
				controller : "first"
			}).state("manage",{
				url : "/manage",
				templateUrl :"html/manage.html",
				controller : "second"
			}).state("find",{
				url : "/find",
				templateUrl : "html/find.html",
				controller : "third"
			}).state("myself",{
				url : "/myself",
				templateUrl : "html/myself.html",
				controller : "fourth",
				cache : false
			}).state("detail",{
				url : "/detail?:abc:goodsId",
				templateUrl : "html/detail.html",
				controller : "detail",
				param : {abc : null,goodsId : null}
			}).state("login",{
				url : "/login",
				templateUrl : "html/login.html",
				controller : "login"
			}).state("register",{
				url : "/register",
				templateUrl : "html/register.html",
				controller : "register"
			})
		});
	
	//总控制器
	function demo($scope,$state,$http,$interval,$location,$rootScope,$cacheFactory){
		$state.go("shouye");
		//停止刷新
		$scope.doRefresh = function() {
			$scope.$broadcast('scroll.refreshComplete');
		};
		//弹窗计时
		var _time = 1;
		$interval(function(){
			if (_time%2 == 0){
				$scope.tan = false;
			}else{
				$scope.tan = true;
			}
			_time++;
		},5000)
		//监听路由
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            var name = toState.name;
            if (name == "shouye"){
            	$scope.shouye ={color : "#ff5d08"};
            	$scope.manage ={color : "#6b696"};
            	$scope.find ={color : "#6b696"};
            	$scope.myself ={color : "#6b696"};
            	$scope.fff={display : "block"};
            	$scope.bbb={display : "none"};
            }else if (name == "manage"){
            	$scope.shouye ={color : "#6b696"};
            	$scope.manage ={color : "#ff5d08"};
            	$scope.find ={color : "#6b696"};
            	$scope.myself ={color : "#6b696"};
            	$scope.fff={display : "block"};
            	$scope.bbb={display : "none"};
            }else if (name == "find"){
            	$scope.shouye ={color : "#6b696"};
            	$scope.manage ={color : "#6b696"};
            	$scope.find ={color : "#ff5d08"};
            	$scope.myself ={color : "#6b696"};
            	$scope.fff={display : "block"};
            	$scope.bbb={display : "none"};
            }else if (name == "myself"){
            	$scope.shouye ={color : "#6b696"};
            	$scope.manage ={color : "#6b696"};
            	$scope.find ={color : "#6b696"};
            	$scope.myself ={color : "#ff5d08"};
            	$scope.fff={display : "block"};
            	$scope.bbb={display : "none"};
            }else if(name == "detail"){
            	$scope.fff={display : "none"};
            	$scope.bbb={display : "true"};
            }else{
            	$scope.fff={display : "none"};
            	$scope.bbb={display : "none"};
            }    
        });
//      	页面跳转
		$scope.routeGo = function(route){
			$state.go(route,{},{reload:true});
		}
        
		$rootScope.cache = $cacheFactory("cache1");
        $rootScope.touzi = function(){
        	var user = $rootScope.cache.get("user")
        	if (!user){
        		$state.go("register")
        	}else{
        		alert("购买成功")
        	}
        }
        
	};
	//首页  fitst控制器
	function first($scope,$http,$ionicSlideBoxDelegate,$location,$rootScope,$state,$timeout){
		$scope.datalist = [];
		$http({
			method : "get",
			url : "mock/pack.json"
		}).success(function(data){
			$scope.datalist = data.banner;
			$ionicSlideBoxDelegate.loop(true); //解决轮播至最后一个不轮播的问题
     		$ionicSlideBoxDelegate.update();   //解决图片加载不出来的问题
		});
		//通知轮播
		$timeout(function(){
			$scope.swiper = new Swiper(".swiper-container",{
				autoplay:2000,
				loop:true,
				speed:1000,
				direction : "vertical"
			})
		},1)
		//跳转
		$scope.toDetail = function(_url,id){	
			$state.go("detail",{"abc":_url,"goodsId" : id});	
		}
		$scope.toFind = function(){
			$state.go("find")
		}
	};
	//理财 second控制器
	function second($scope,$http,$location,$rootScope,$state){
		$scope.main1list = [];
		$scope.main2list = [];
		$scope.main3list = [];
		$scope.main4list = [];
		//新手专区
		$http({
			method : "get",
			url : "mock/pack.json"
		}).success(function(data){
			$scope.main1list = data.newhand;
			$scope.main1list = $scope.main1list.slice(0,1)
		})
		//特权专享
		$http({
			method : "get",
			url : "mock/pack.json"
		}).success(function(data){
			$scope.main2list = data.privilege;
		})
		//精品专区
		$http({
			method : "get",
			url : "mock/pack.json"
		}).success(function(data){
			$scope.main3list = data.boutique;
			
		})
		//已售罄
		$http({
			method : "get",
			url : "mock/pack.json"
		}).success(function(data){
			$scope.main4list = data.boutique2;
		})
		//已还款
		$http({
			method : "get",
			url : "mock/pack.json"
		}).success(function(data){
			$scope.main5list = data.boutique3;
		})
		//跳转
		$scope.toDetail = function(_url,id){	
			$state.go("detail",{"abc":_url,"goodsId" : id});	
		}
	}
	//发现 third控制器
	function third($scope,$http,$location,$rootScope,$state){
		$scope.datalist = [];
		$scope.left = true;
		$scope.right = false;
		$scope.doRefresh = function() {
			$scope.$broadcast('scroll.refreshComplete');
		};
		$http({
			method : "get",
			url : "mock/pack.json"
		}).success(function(data){
			$scope.datalist = data.banner;
		})
		$scope.ll={
				color : '#ff7131'
			}
			$scope.rr={
				color : '#636563'
			}
		$scope.clickLeft = function(){
			$scope.left = true;
			$scope.right = false;
			$scope.ll={
				color : '#ff7131'
			}
			$scope.rr={
				color : '#636563'
			}
		}
		$scope.clickRight = function(){
			$scope.left = false;
			$scope.right = true;
			$scope.ll={
				color : '#636563'
			}
			$scope.rr={
				color : '#ff7131'
			}
		}
		$scope.toDetail = function(_url,id){	
			$state.go("detail",{"abc":_url,"goodsId" : id});	
		}
	}
	//我的 fourth控制器
	function fourth($scope,$http,$location,$rootScope,$state,$timeout,$cacheFactory){
		$scope.doRefresh = function() {
			$scope.$broadcast('scroll.refreshComplete');
		};
		$scope.goLogin = function(){
			$state.go("register")
		}
		//删除信息
		$scope.removeUser = function (){
			$rootScope.cache.remove("user")	
			$state.reload("myself")
		}
		
		var user = $rootScope.cache.get("user");
			if (user){
				$scope.yidenglu=true;
				$scope.weidenglu=false;
				$scope.users = user;
			}else{
				$scope.yidenglu=false;
				$scope.weidenglu=true;
			}
		
	}
	//详情 detail控制器
	function detail($scope,$http,$location,$rootScope,$stateParams,$state,$ionicNavBarDelegate,$cacheFactory){
		//传参获取数据
		var d = $stateParams.abc,
			i = $stateParams.goodsId;
		$http({
			method : "get",
			url : "mock/pack.json"
		}).success(function(data){
			var _data = data[d];
			$scope._detail = _data[i];
		})
		$scope.doRefresh = function() {
			$scope.$broadcast('scroll.refreshComplete');
		};
		$scope.residues = true;
		//返回按钮
		$scope.goback = function(){
			$state.go("manage")
		}
		$scope.ren = Math.floor(Math.random()*30)+10;
	}
	
	//登录注册 login控制器
	function login($scope,$http,$location,$rootScope,$state,$ionicNavBarDelegate,$timeout){
		$scope.goback = function(){
			$state.go("myself")
		}
//		判断是否有值
		$scope.shuru = function(){
			if ($scope.user){
				$scope.deng={
					background: 'linear-gradient(to right, #ffa530,#fd5500)'
				}
			}else{
				$scope.deng={
			        background: "#cdc4bb"
				}
			}
		}
//		注册提交
		$scope.goregister = function(){
			var username = $scope.user;
			var password = $scope.pass;
			$http({
				method:"post",
				url:"http://stuapi.ysd3g.com/api/CreateUser",
				params:{loginName:username,pwd:password,token:"aa4ccde8-3b85-476d-b68b-7f78f72e74d1"}
			}).success(function(data){
				console.log(data)
				if (data.success == true){
					$state.go("register");
				}else{
					$scope.jinggao=true;
					$timeout(function(){
						$scope.jinggao=false;
					},3000)
				}
			})
		}
	}
//	登录
	function register($scope,$http,$location,$rootScope,$state,$ionicNavBarDelegate,$timeout,$cacheFactory){
		$scope.goback = function(){
			$state.go("myself")
		}
		$scope.qu = function(){
			$state.go("login")
		}
//		判断是否有值
		$scope.shuru = function(){
			console.log($scope.user)
			if ($scope.user){
				$scope.deng={
					background: 'linear-gradient(to right, #ffa530,#fd5500)'
				}
			}else{
				$scope.deng={
			        background: "#cdc4bb"
				}
			}
		}
//		登录提交
		$scope.goregister = function(){
			var username = $scope.user;
			var password = $scope.pass;
			$http({
				method:"post",
				url:"http://stuapi.ysd3g.com/api/login",
				params:{un:username,pwd:password,token:"aa4ccde8-3b85-476d-b68b-7f78f72e74d1"}
			}).success(function(data){
				if (data.success == true){
//					登录成功,上传缓存,跳转到manage页面
					$rootScope.cache.put("user",username);
					$state.go("manage");
				}else{
					$scope.jinggao=true;
					$timeout(function(){
						$scope.jinggao=false;
					},3000)
				}
			})
		}
		
	}
