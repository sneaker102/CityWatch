package com.app.server.model;

import jdk.nashorn.internal.objects.annotations.Getter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToOne;
import java.sql.Timestamp;
import java.util.Date;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class Auditable<U>
{
	@CreatedBy
	@JoinColumn(name = "created_by")
	@OneToOne
	private U createdBy;

	@CreatedDate
	@Column(name = "created_date")
	private Timestamp createdDate;

	@LastModifiedBy
	@OneToOne
	@JoinColumn(name = "last_modified_by")
	private U lastModifiedBy;

	@LastModifiedDate
	@Column(name = "last_modified_date")
	private Timestamp lastModifiedDate;
}

