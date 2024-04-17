#------------------------------------------
#LeeKangHoo(nine)
#Server Vulnerability Analysis Project
#First Ahya Is Best
#FAIB
#------------------------------------------
result_file="FAIB_result.json"
echo "" > $result_file

#Json write function
json() {
    local vul_code=$1
    local status=$2
    

    local json="{\n  \"vul_code\": \"$vul_code\",\n  \"status\": \"$status\"\n},"
    
    echo -e "$json" >> "$result_file"
    echo >> "$result_file"
}


#Acount,File and Directory,Service,Fatch,Log
#A-@,FnD-@,S-@,F-@,L-@

#A-1
code="A-1"
file_path="/etc/pam.d/login"
if [[ -f "$file_path" ]]; then
    if ! grep -v '^#' "$file_path" | grep -qP 'auth\s+required\s+/lib/security/pam_securetty\.so'; then
	json "$code" "warning(check $file_path)" 
    fi
else
    json "$code" "warning($file_path not found.)"
fi

file_path="/etc/securetty"
if [[ -f "$file_path" ]]; then
    if grep -v "^#" "$file_path" | grep "pts"; then
	json "$code" "warning(check $file_path)"
    fi
else
    json "$code" "warning($file_path not found.)"
fi

file_path="/etc/sshd_config"
file_path2="/etc/ssh/sshd_config"
if [[ -f "$file_path" ]]; then
    if ! grep -v "^#" "$file_path2" | grep -qP "PermitRootLogin\s+no"; then
	json "$code" "warning(check $file_path)"
    fi
elif [[ -f "$file_path2" ]]; then
    if ! grep -v "^#" "$file_path2" | grep -qP "PermitRootLogin\s+no"; then
	json "$code" "warning(check $file_path2)"
    fi
else
    json "$code" "warning($file_path or $file_path2 not found)"
fi

#A-2
code="A-2"
file_path="/etc/pam.d/system-auth"
file_path2="/etc/security/pwquality.conf"
#if [[ -f "$file_path" ]]; then
#    if ! grep -v "^#" "$file_path2" | grep -qP "password\s+requisite\s+/lib/security/$ISA/pam_cracklib.so\s+retry=3\s+minlen=8\s+lcredit=-1\s+ucredit\s+dcredit=-1\s+ocredit=-1"; then
#	json "$file_path" "warning(check $file_path)"
#    fi
if [[ -f "$file_path2" ]]; then
    if ! grep -v "^#" "$file_path2" | grep -qP "password\s+requisite\s+pam_cracklib.so\s+try_first_pass\s+retry=3\s+minlen=8\s+lcredit=-1\s+ucredit=-1\s+dcredit=-1\s+ocredit=-1"; then
	json "$code" "warning(check $file_path2)"
    fi
else
    json "$code" "warning($file_path or $file_path2 not found)"
fi

#A-3
code="A-3"
file_path="/etc/pam.d/system-auth"
if [[ -f "$file_path" ]]; then
    if ! grep -v "^#" "$file_path" | grep -qP "auth\s+required\s+/lib/security/pam_tally.so\s+deny=[^0-4]\s+unlock_time=" || ! grep -v "^#" "$file_path" | grep -q "no_magic_root" || ! grep -v "^#" "$file_path" | grep -qP "account\s+required\s+/lib/security/pam_tally.so\s+no_magic_root\s+reset"; then
        json "$code" "warning(check $file_path)"
    fi
else
    json "$code" "warning($file_path not found.)"
fi

#A-4
code="A-4"
file_path="/etc/passwd"
if [[ -f "$file_path" ]]; then
    if grep -v "^#" "$file_path" | grep -qvE '^[^:]+:x:'; then
        json "$code" "warning(check $file_path)"
    fi
else
    json "$code" "warning($file_path not found.)"
fi

#FnD-1
code="FnD-1"
temp=$(echo "$PATH" | grep -E '\.|::|:\.:')
if [[ -z $temp ]]; then
    json "$code" "warning(PATH variable is weak.)" 
fi

#FnD-2
#code="FnD-2"
#if [[ -z $(find / -nouser -print | find / -nogroup -print) ]]; then
#    echo good
#fi




#delete last ,
sed -i '$ d' "$result_file"
sed -i '$s/,$//' $result_file


#send data
result_file_path="FAIB_result.json"
server_url="http://dev.nine9.kr/upload"
curl -X POST -F "file=@$result_file_path" $server_url
echo ""