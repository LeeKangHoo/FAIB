import os

def acount_1():
	global a_1
	file_path = "/etc/pam.d/login"
	try:
		with open(file_path,'r') as file:
			content = file.read()
			if "auth required /lib/security/pam_securetty.so" in content:
				a_1 = 0
			else:
				a_1 = 1
			
	except FileNotFoundError:
		print(f"{file_path}를 찾을 수 없습니다. (경로 확인 요망)")
	except Exception as e:
		print(f"에러 발생 :{str(e)}")

if __name__ == "__main__":
	acount_1()
	print(a_1)

