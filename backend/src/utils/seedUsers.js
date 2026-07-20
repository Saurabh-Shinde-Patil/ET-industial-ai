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
      email: 'maint_eng@plant.com',
      passwordHash: 'Password123!',
      role: 'Maintenance Engineer',
      department: 'Mechanical Maintenance',
    },
    {
      username: 'reliability_eng',
      email: 'reliability_eng@plant.com',
      passwordHash: 'Password123!',
      role: 'Reliability Engineer',
      department: 'Asset Health & Predictive Maintenance',
    },
    {
      username: 'safety_officer',
      email: 'safety_officer@plant.com',
      passwordHash: 'Password123!',
      role: 'Safety Officer',
      department: 'EHS & Regulatory Compliance',
    },
    {
      username: 'prod_eng',
      email: 'prod_eng@plant.com',
      passwordHash: 'Password123!',
      role: 'Production Engineer',
      department: 'Process Optimization',
    },
    {
      username: 'plant_mgr',
      email: 'plant_mgr@plant.com',
      passwordHash: 'Password123!',
      role: 'Plant Manager',
      department: 'Executive Plant Management',
    },
    {
      username: 'doc_admin',
      email: 'doc_admin@plant.com',
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
    let user = await User.findOne({
      $or: [{ username: acc.username }, { email: acc.email }],
    });

    if (!user) {
      user = await User.create(acc);
      created.push({ username: user.username, role: user.role, email: user.email, status: 'created' });
    } else {
      // Ensure password hash & email are updated to standard demo credentials
      user.email = acc.email;
      user.passwordHash = acc.passwordHash;
      await user.save();
      created.push({ username: user.username, role: user.role, email: user.email, status: 'updated' });
    }
  }

  logger.info(`Industrial Demo User Accounts ready (${created.length} roles mapped)`);
  return created;
};
