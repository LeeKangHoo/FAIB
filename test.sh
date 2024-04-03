if ! grep -v "^#" "/etc/pam.d/system-auth" | grep -qP "auth\s+required\s+/lib/security/pam_tally.so\s+deny=[^0-4]\s+unlock_time="; then
    echo "good"
fi
