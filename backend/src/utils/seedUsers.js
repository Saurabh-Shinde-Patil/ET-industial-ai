import User from '../models/userModel.js';
import logger from '../config/logger.js';

export const seedInitialUsers = async () => {
  const demoAccounts = [
    {
      username: 'operator',
      email: 'operator@plant.com',
      passwordHash: 'Password123!',
      role: 'Plant Operator',
      department: 'Boiler & Turbine Operations',
    },
    {
      username: 'maint_eng',
      email: 'maint.eng@plant.com',
      passwordHash: 'Password123!',
      role: 'Maintenance Engineer',
      department: 'Mechanical Maintenance',
    },
    {
      username: 'reliability_eng',
      email: 'reliability@plant.com',
      passwordHash: 'Password123!',
      role: 'Reliability Engineer',
      department: 'Asset Health & Predictive Maintenance',
    },
    {
      username: 'safety_officer',
      email: 'safety@plant.com',
      passwordHash: 'Password123!',
      role: 'Safety Officer',
      department: 'EHS & Regulatory Compliance',
    },
    {
      username: 'prod_eng',
      email: 'production@plant.com',
      passwordHash: 'Password123!',
      role: 'Production Engineer',
      department: 'Process Optimization',
    },
    {
      username: 'plant_mgr',
      email: 'manager@plant.com',
      passwordHash: 'Password123!',
      role: 'Plant Manager',
      department: 'Executive Plant Management',
    },
    {
      username: 'doc_admin',
      email: 'docadmin@plant.com',
      passwordHash: 'Password123!',
      role: 'Knowledge Admin',
      department: 'Knowledge Management',
    },
    {
      username: 'admin',
      email: 'admin@plant.com',
      passwordHash: 'Password123!',
      role: 'Admin',
      department: 'System Administration',
    },
  ];

  const created = [];
  for (const acc of demoAccounts) {
    const exists = await User.findOne({ username: acc.username });
    if (!exists) {
      const user = await User.create(acc);
      created.push({ username: user.username, role: user.role, email: user.email });
    } else {
      created.push({ username: exists.username, role: exists.role, email: exists.email, status: 'existing' });
    }
  }

  logger.info(`Industrial Demo User Accounts ready (${created.length} roles mapped)`);
  return created;
};
