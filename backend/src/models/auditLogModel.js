import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        'AUTH_LOGIN',
        'AUTH_REGISTER',
        'USER_CREATE',
        'ROLE_CHANGE',
        'USER_DEACTIVATE',
        'USER_ACTIVATE',
        'DOC_UPLOAD',
        'DOC_DELETE',
        'LOW_CONFIDENCE_QUERY',
      ],
      index: true,
    },
    details: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      default: '127.0.0.1',
    },
  },
  {
    timestamps: true,
  }
);

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
