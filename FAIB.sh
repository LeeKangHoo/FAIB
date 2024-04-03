#------------------------------------------
#LeeKangHoo(nine)
#Server Vulnerability Analysis Project
#First Ahya Is Best
#FAIB
#------------------------------------------
result_file="FAIB_result.txt"
echo "" > $result_file


#Acount,File and Directory,Service,Fatch,Log
#A-@,FnD-@,S-@,F-@,L-@

#A-1
echo "A-1" >> "$result_file"
file_path="/etc/pam.d/login"
if [[ -f "$file_path" ]]; then
    if ! grep -v '^#' "$file_path" | grep -qP 'auth\s+required\s+/lib/security/pam_securetty\.so'; then
	echo "warning(check $file_path)" >> "$result_file"
    fi
else
    echo "warning($file_path not found.)" >> "$result_file"
fi

file_path="/etc/securetty"
if [[ -f "$file_path" ]]; then
    if grep -v "^#" "$file_path" | grep "pts"; then
	echo "warning(check $file_path)" >> "$result_file"
    fi
else
    echo "warning($file_path not found.)" >> "$result_file"
fi

file_path="/etc/sshd_config"
file_path2="/etc/ssh/sshd_config"
if [[ -f "$file_path" ]]; then
    if ! grep -v "^#" "$file_path2" | grep -qP "PermitRootLogin\s+no"; then
	echo "warning(check $file_path)" >> "$result_file"
    fi
elif [[ -f "$file_path2" ]]; then
    if ! grep -v "^#" "$file_path2" | grep -qP "PermitRootLogin\s+no"; then
	echo "warning(check $file_path2)" >> "$result_file"
    fi
else
    echo "warning($file_path or $file_path2 not found.)" >> "$result_file"
fi

#A-2
file_path="/etc/pam.d/system-auth"
file_path2="/etc/security/pwquality.conf"
#if [[ -f "$file_path" ]]; then
#    if ! grep -v "^#" "$file_path2" | grep -qP "password\s+requisite\s+/lib/security/$ISA/pam_cracklib.so\s+retry=3\s+minlen=8\s+lcredit=-1\s+ucredit\s+dcredit=-1\s+ocredit=-1"; then
#	echo "warning(check $file_path)" >> "$result_file"
#    fi
if [[ -f "$file_path2" ]]; then
    if ! grep -v "^#" "$file_path2" | grep -qP "password\s+requisite\s+pam_cracklib.so\s+try_first_pass\s+retry=3\s+minlen=8\s+lcredit=-1\s+ucredit=-1\s+dcredit=-1\s+ocredit=-1"; then
	echo "warning(check $file_path2)" >> "$result_file"
    fi
else
    echo "warning($file_path or $file_path2 not found.)" >> "$result_file"
fi

